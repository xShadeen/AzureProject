package project.backend.client_service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import project.backend.client.Client;
import project.backend.client.ClientRepository;
import project.backend.client.ClientService;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientService clientService;

    private Client client1;
    private Client client2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        client1 = new Client("user1", "pass123");
        client2 = new Client("user2", "pass456");
    }

    @Test
    void testGetClients() {
        when(clientRepository.findAll()).thenReturn(Arrays.asList(client1, client2));

        List<Client> clients = clientService.getClients();

        assertEquals(2, clients.size());
        assertEquals("user1", clients.get(0).getLogin());
        assertEquals("user2", clients.get(1).getLogin());

        verify(clientRepository, times(1)).findAll();
    }

    @Test
    void testGetClientByLogin_Success() {
        when(clientRepository.findByLogin("user1")).thenReturn(Optional.of(client1));

        Client client = clientService.getClientByLogin("user1");

        assertNotNull(client);
        assertEquals("user1", client.getLogin());

        verify(clientRepository, times(1)).findByLogin("user1");
    }

    @Test
    void testGetClientByLogin_NotFound() {
        when(clientRepository.findByLogin("user1")).thenReturn(Optional.empty());

        Client client = clientService.getClientByLogin("user1");

        assertNull(client);

        verify(clientRepository, times(1)).findByLogin("user1");
    }

    @Test
    void testGetClientById_Success() {
        when(clientRepository.findById(1L)).thenReturn(Optional.of(client1));

        Client client = clientService.getClientById(1L);

        assertNotNull(client);
        assertEquals("user1", client.getLogin());

        verify(clientRepository, times(1)).findById(1L);
    }

    @Test
    void testGetClientById_NotFound() {
        when(clientRepository.findById(1L)).thenReturn(Optional.empty());

        Client client = clientService.getClientById(1L);

        assertNull(client);

        verify(clientRepository, times(1)).findById(1L);
    }
}


