package project.backend.words;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import project.backend.courses.Course;

import java.util.List;

@Entity
@Table(name="words")
public class Words {
    @Id
    @SequenceGenerator(
            name = "words_sequence",
            sequenceName = "words_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "words_sequence"
    )
    private Long id;

    private String word;
    private String translation;
    private String description;


    @JsonBackReference("course_wordsReference")
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    public Words() {
    }

    public Words(Long id, String word, String translation, String description, Course course) {
        this.id = id;
        this.word = word;
        this.translation = translation;
        this.description = description;
        this.course = course;
    }

    public Words(String word, String translation, String description, Course course) {
        this.word = word;
        this.translation = translation;
        this.description = description;
        this.course = course;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Words{" +
                "description='" + description + '\'' +
                ", translation='" + translation + '\'' +
                ", word='" + word + '\'' +
                ", id=" + id +
                '}';
    }


}
