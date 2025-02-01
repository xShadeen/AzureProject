package project.backend.courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.client.Client;
import project.backend.client.ClientService;
import project.backend.saved_courses.SavedCoursesService;

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
    public List<Course> getCoursesByClientId(@PathVariable Long clientId) {
        return courseService.getCoursesByClientId(clientId);
    }
    @GetMapping("/get/{courseId}")
    public Course getCourseById(@PathVariable Long courseId) {
        return courseService.getCourseById(courseId);
    }

    @PostMapping("/add")
    public ResponseEntity<Course> addCourse(@RequestBody Course course, @RequestParam Long clientId){

        course.setWords(null);
        Client client = clientService.getClientById(clientId);

        course.setClient(client);
        Course newCourse = courseService.saveCourse(course);
        return new ResponseEntity<>(newCourse, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long courseId) {
        try {
            savedCoursesService.deleteByCourseId(courseId);

            courseService.deleteCourse(courseId);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete course.");
        }
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
            System.out.println("Nie znaleziono kursu");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
