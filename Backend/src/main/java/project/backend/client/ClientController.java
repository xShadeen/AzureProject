package project.backend.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

    @PostMapping("/register")
    public ResponseEntity<Client> addClient(@RequestBody Client client) {
        Client existingClient = clientService.getClientByLogin(client.getLogin());
        if (existingClient != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Client newClient = clientService.saveClient(client);
        return new ResponseEntity<>(newClient, HttpStatus.CREATED);
    }

    @GetMapping("/exists/{login}")
    public ResponseEntity<Client> isLoginExist(@PathVariable String login) {
        Client client = clientService.getClientByLogin(login);
        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            Client emptyClient = new Client();
            return ResponseEntity.ok(emptyClient);
        }
    }
}