package project.backend.words;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
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

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/add/{courseId}")
    public ResponseEntity<Words> addWord(@PathVariable Long courseId, @RequestBody Words word, Authentication authentication) {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
        Jwt jwt = jwtAuthenticationToken.getToken();
        Long authenticatedClientId = jwt.getClaim("clientId");

        Course course = courseService.getCourseById(courseId);
        word.setCourse(course);
        wordsService.saveWord(word);
        return ResponseEntity.ok(word);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/delete/{wordId}")
    public ResponseEntity<?> deleteWord(@PathVariable Long wordId, Authentication authentication) {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
        Jwt jwt = jwtAuthenticationToken.getToken();
        Long authenticatedClientId = jwt.getClaim("clientId");

        wordsService.deleteWord(wordId);
        return ResponseEntity.ok().build();
    }
}

