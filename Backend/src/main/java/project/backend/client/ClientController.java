package project.backend.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping(path = "/api/clients")
public class ClientController {

    private final ClientService clientService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

    @Autowired
    public ClientController(ClientService clientService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.clientService = clientService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    // GET - Pobieranie wszystkich klientów
    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

    // POST - Rejestracja użytkownika
    @PostMapping("/register")
    public ResponseEntity<Client> addClient(@RequestBody Client client) {
        Client existingClient = clientService.getClientByLogin(client.getLogin());
        if (existingClient != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        // Przypisanie domyślnej roli "USER"
        client.setRole(Role.USER);

        // Zaszyfrowanie hasła przed zapisaniem do bazy
        client.setPassword(passwordEncoder.encode(client.getPassword()));

        Client newClient = clientService.saveClient(client);

        // Zwracamy zarejestrowanego klienta w odpowiedzi
        return new ResponseEntity<>(newClient, HttpStatus.CREATED);
    }

    // GET - Pobieranie klienta po ID
    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        Client client = clientService.getClientById(id);

        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(client);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Client client) {
        logger.info("Attempting login for user: {}", client.getLogin());

        // Sprawdź, czy klient istnieje w bazie danych
        Client existingClient = clientService.getClientByLogin(client.getLogin());

        // Jeśli klient nie istnieje lub hasło jest błędne
        if (existingClient == null || !passwordEncoder.matches(client.getPassword(), existingClient.getPassword())) {
            logger.warn("Invalid login attempt for user: {}", client.getLogin());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login or password");
        }
        System.out.println("Client role: " + existingClient.getRole());

        // Generowanie tokenu dla istniejącego klienta (existingClient ma już id)
        String token = jwtUtil.generateToken(existingClient.getLogin(), existingClient.getId(), existingClient.getRole());

        // Tworzenie obiektu odpowiedzi z tokenem, clientId oraz rolą
        LoginResponse loginResponse = new LoginResponse(token, existingClient.getId(), existingClient.getRole());

        logger.info("Login successful for user: {}", client.getLogin());

        return ResponseEntity.ok(loginResponse);
    }

    // GET - Weryfikacja tokenu JWT
    @GetMapping("/validate-token")
    public ResponseEntity<String> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }

        String token = authHeader.substring(7);  // Usuwamy prefiks "Bearer "
        if (jwtUtil.validateToken(token)) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is expired or invalid");
        }
    }
}
