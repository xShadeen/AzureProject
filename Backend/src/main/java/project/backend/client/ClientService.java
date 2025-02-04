package project.backend.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public Client getClientByLogin(String login) {
        Optional<Client> client = clientRepository.findByLogin(login);
        return client.orElse(null);
    }
    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }
}
