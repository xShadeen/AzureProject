package project.backend.client;

public class LoginResponse {

    private String token;
    private Long clientId;
    private Role role;  // Dodano pole roli

    // Konstruktor
    public LoginResponse(String token, Long clientId, Role role) {
        this.token = token;
        this.clientId = clientId;
        this.role = role;  // Inicjalizacja roli
    }

    // Gettery i settery
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
