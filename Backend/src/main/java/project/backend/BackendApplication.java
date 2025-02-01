package project.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		System.out.println("SPRING_APPLICATION_NAME: " + dotenv.get("SPRING_APPLICATION_NAME"));

		System.setProperty("SPRING_APPLICATION_NAME", Objects.requireNonNull(dotenv.get("SPRING_APPLICATION_NAME")));
		System.setProperty("SPRING_DATASOURCE_URL", Objects.requireNonNull(dotenv.get("SPRING_DATASOURCE_URL")));
		System.setProperty("SPRING_DATASOURCE_USERNAME", Objects.requireNonNull(dotenv.get("SPRING_DATASOURCE_USERNAME")));
		System.setProperty("SPRING_DATASOURCE_PASSWORD", Objects.requireNonNull(dotenv.get("SPRING_DATASOURCE_PASSWORD")));
		System.setProperty("SPRING_JPA_HIBERNATE_DDL_AUTO", Objects.requireNonNull(dotenv.get("SPRING_JPA_HIBERNATE_DDL_AUTO")));
		System.setProperty("SPRING_JPA_SHOW_SQL", Objects.requireNonNull(dotenv.get("SPRING_JPA_SHOW_SQL")));
		System.setProperty("SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT", Objects.requireNonNull(dotenv.get("SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT")));
		System.setProperty("SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL", Objects.requireNonNull(dotenv.get("SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL")));
		SpringApplication.run(BackendApplication.class, args);
	}

}
