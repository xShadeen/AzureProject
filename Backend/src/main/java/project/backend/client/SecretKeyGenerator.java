package project.backend.client;

import java.util.Base64;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

public class SecretKeyGenerator {
    public static void main(String[] args) throws Exception {
        // Generowanie klucza HmacSHA256
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
        keyGen.init(256);  // Możesz wybrać 256-bitowy klucz
        SecretKey secretKey = keyGen.generateKey();

        // Kodowanie klucza w Base64, aby można było go przechować w konfiguracji
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());

        // Wypisanie wygenerowanego klucza
        System.out.println("Generated Secret Key: " + encodedKey);
    }
}


