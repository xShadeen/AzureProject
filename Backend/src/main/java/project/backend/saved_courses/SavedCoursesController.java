package project.backend.saved_courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import project.backend.client.Client;
import project.backend.client.ClientService;
import project.backend.courses.Course;
import project.backend.courses.CourseService;

import java.nio.file.AccessDeniedException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/saved_courses")
public class SavedCoursesController {
    private final SavedCoursesService savedCoursesService;
    private final ClientService clientService;
    private final CourseService courseService;

    @Autowired
    public SavedCoursesController(SavedCoursesService savedCoursesService, ClientService clientService, CourseService courseService) {
        this.savedCoursesService = savedCoursesService;
        this.clientService = clientService;
        this.courseService = courseService;
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<List<SavedCourses>> getSavedCoursesByClientId(@PathVariable Long clientId, Authentication authentication) {

        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
        Jwt jwt = jwtAuthenticationToken.getToken();
        Long authenticatedClientId = jwt.getClaim("clientId");

        if (!authenticatedClientId.equals(clientId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.emptyList());
        }

        List<SavedCourses> savedCourses = savedCoursesService.getSavedCoursesByClientId(clientId);
        return ResponseEntity.ok(savedCourses);
    }

    @PostMapping("/{clientId}/{courseId}")
    public ResponseEntity<SavedCourses> addSavedCourse(@PathVariable Long clientId, @PathVariable Long courseId, Authentication authentication) {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
        Jwt jwt = jwtAuthenticationToken.getToken();
        Long authenticatedClientId = jwt.getClaim("clientId");

        if (!authenticatedClientId.equals(clientId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        Client client = clientService.getClientById(clientId);
        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Course course = courseService.getCourseById(courseId);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        SavedCourses savedCourses = new SavedCourses(course, client);
        SavedCourses savedCoursesResult = savedCoursesService.save(savedCourses);

        return ResponseEntity.ok(savedCoursesResult);
    }

    @DeleteMapping("/delete/{courseId}")
    public void deleteSavedCourse(@PathVariable Long courseId, Authentication authentication) throws AccessDeniedException {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
        Jwt jwt = jwtAuthenticationToken.getToken();
        Long authenticatedClientId = jwt.getClaim("clientId");

        SavedCourses savedCourse = savedCoursesService.getSavedCourseByCourseId(courseId);

        if (!savedCourse.getClient().getId().equals(authenticatedClientId)) {
            throw new AccessDeniedException("You are not authorized to delete this course");
        }

        savedCoursesService.deleteByCourseId(courseId);
    }
}
