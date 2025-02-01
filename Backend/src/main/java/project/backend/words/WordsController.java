package project.backend.words;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.courses.Course;
import project.backend.courses.CourseService;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/words")
public class WordsController {
    private final WordsService wordsService;
    private final CourseService courseService;

    @Autowired
    public WordsController(WordsService wordsService, CourseService courseService) {
        this.wordsService = wordsService;
        this.courseService = courseService;
    }

    @GetMapping("/{courseId}")
    public List<Words> getAllWordsByCourseId(@PathVariable Long courseId) {
        return wordsService.getAllWordsByCourseId(courseId);
    }

    @PostMapping("/add/{courseId}")
    public ResponseEntity<Words> addWord(@PathVariable Long courseId, @RequestBody Words word) {
        Course course = courseService.getCourseById(courseId);
        word.setCourse(course);
        wordsService.saveWord(word);
        return ResponseEntity.ok(word);
    }
    @DeleteMapping("/delete/{wordId}")
    public ResponseEntity<?> deleteWord(@PathVariable Long wordId) {
        wordsService.deleteWord(wordId);
        return ResponseEntity.ok().build();
    }

}
