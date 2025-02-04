package project.backend.cors;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import project.backend.client.Role;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey SECRET_KEY;

    public JwtUtil() {
        this.SECRET_KEY = generateSecretKey();
    }

    private SecretKey generateSecretKey() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            keyGen.init(256);
            return keyGen.generateKey();
        } catch (Exception e) {
            throw new RuntimeException("Error generating secret key", e);
        }
    }

    public String generateToken(String username, Long clientId, Role role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 3600000);
        System.out.println("Generated token with role: " + role.name());
        return Jwts.builder()
                .setSubject(username)
                .claim("clientId", clientId)
                .claim("role", role.name())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public SecretKey getSigningKey() {
        if (SECRET_KEY == null) {
            throw new IllegalStateException("JWT secret key is not set.");
        }
        return SECRET_KEY;
    }
}
