package project.backend.saved_courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.client.Client;
import project.backend.client.ClientService;
import project.backend.courses.Course;
import project.backend.courses.CourseService;

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
    public List<SavedCourses> getSavedCoursesByClientId(@PathVariable Long clientId) {
        List<SavedCourses> savedCourses = savedCoursesService.getSavedCoursesByClientId(clientId);
        System.out.println("Fetched saved courses for clientId " + clientId + ": " + savedCourses);
        return savedCourses;
    }

    @PostMapping("/{clientId}/{courseId}")
    public ResponseEntity<SavedCourses> addSavedCourse(@PathVariable Long clientId, @PathVariable Long courseId) {
        Client client = clientService.getClientById(clientId);
        Course course = courseService.getCourseById(courseId);

        SavedCourses savedCourses = new SavedCourses();
        savedCourses.setClient(client);
        savedCourses.setCourse(course);

        SavedCourses savedCoursesResult = savedCoursesService.save(savedCourses);

        return ResponseEntity.ok(savedCoursesResult);
    }

    @DeleteMapping("/delete/{courseId}")
    public void deleteSavedCourse(@PathVariable Long courseId){
        savedCoursesService.deleteByCourseId(courseId);
    }
}
