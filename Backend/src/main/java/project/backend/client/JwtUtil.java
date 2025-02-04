package project.backend.client;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "Jd7b5gX9P6Ltqu9Z59h7m88Uv7fK9Vf3Dd8K67k4D2g=";

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
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }




    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Metoda zwracająca klucz podpisu
    public SecretKey getSigningKey() {
        if (SECRET_KEY == null || SECRET_KEY.isEmpty()) {
            throw new IllegalStateException("JWT secret key is not set.");
        }
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        return new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
    }
}
