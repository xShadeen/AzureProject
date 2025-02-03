package project.backend.courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.backend.client.Client;
import project.backend.client.ClientService;
import project.backend.client.Role;
import project.backend.saved_courses.SavedCoursesService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(path = "api/courses")
public class CourseController {
    private final CourseService courseService;
    private final ClientService clientService;
    private final SavedCoursesService savedCoursesService;

    @Autowired
    public CourseController(CourseService courseService, ClientService clientService, SavedCoursesService savedCoursesService) {
        this.courseService = courseService;
        this.clientService = clientService;
        this.savedCoursesService = savedCoursesService;
    }

    @GetMapping
    public List<Course> getCourses() {
        return courseService.getCourses();
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<List<Course>> getCoursesByClientId(@PathVariable Long clientId, Authentication authentication) {
        // Pobieranie clientId z JWT
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
        Jwt jwt = jwtAuthenticationToken.getToken();
        Long authenticatedClientId = jwt.getClaim("clientId");
        System.out.println(authenticatedClientId);
        // Sprawdzamy, czy clientId w URL jest zgodne z clientId w JWT
        if (!authenticatedClientId.equals(clientId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.emptyList());
        }

        // Pobieranie kursów
        List<Course> courses = courseService.getCoursesByClientId(clientId);
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/add")
    public ResponseEntity<Course> addCourse(@RequestBody Course course, Authentication authentication) {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
        Jwt jwt = jwtAuthenticationToken.getToken();
        Long authenticatedClientId = jwt.getClaim("clientId");

        // Pobierz użytkownika z bazy danych na podstawie clientId
        Client client = clientService.getClientById(authenticatedClientId);

        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Ustaw klienta dla kursu
        course.setClient(client);

        // Tworzenie i zapisywanie kursu
        Course newCourse = courseService.saveCourse(course);
        return new ResponseEntity<>(newCourse, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long courseId, Authentication authentication) {
        // Otrzymujemy token JWT z Authentication
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
        Jwt jwt = jwtAuthenticationToken.getToken();

        // Odczytujemy clientId i rolę z tokenu
        Long authenticatedClientId = jwt.getClaim("clientId");
        String roleString = jwt.getClaim("role"); // Pobieramy rolę jako String

        // Pobieramy kurs z bazy danych
        Course course = courseService.getCourseById(courseId);

        // Sprawdzamy, czy użytkownik jest ADMINEM lub właścicielem kursu
        if ("ADMIN".equals(roleString) || course.getClient().getId().equals(authenticatedClientId)) {
            // Usuwamy kurs
            savedCoursesService.deleteByCourseId(courseId);
            courseService.deleteCourse(courseId);
            return ResponseEntity.ok().build();
        }

        // Jeśli użytkownik nie jest ADMINEM ani właścicielem kursu, zwróć błąd
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
    }



    @GetMapping("/get/{courseId}")
    public Course getCourseById(@PathVariable Long courseId) {
        return courseService.getCourseById(courseId);
    }
    @PutMapping("/update/{courseId}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long courseId, @RequestBody Course updatedCourse) {
        Course existingCourse = courseService.getCourseById(courseId);

        if (existingCourse != null) {
            existingCourse.setTitle(updatedCourse.getTitle());
            existingCourse.setDescription(updatedCourse.getDescription());
            existingCourse.setLanguage(updatedCourse.getLanguage());

            Course savedCourse = courseService.saveCourse(existingCourse);
            return new ResponseEntity<>(savedCourse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

