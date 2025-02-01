package project.backend.courses;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import project.backend.client.Client;
import project.backend.saved_courses.SavedCourses;
import project.backend.words.Words;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course")
public class Course {

    @Id
    @SequenceGenerator(
            name = "course_sequence",
            sequenceName = "course_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "course_sequence"
    )
    private Long id;

    private String title;
    private String description;
    private String language;

    @JsonBackReference("client_coursesReference")
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @JsonManagedReference("course_savedCoursesReference")
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<SavedCourses> savedCourses = new ArrayList<>();

    @JsonManagedReference("course_wordsReference")
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Words> words;

    public Course() {
    }

    public Course(Long id, String title, String description, String language, Client client, List<Words> words) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.language = language;
        this.client = client;
        this.words = words;
    }

    public Course(String title, String description, String language, Client client, List<Words> words) {
        this.title = title;
        this.description = description;
        this.language = language;
        this.client = client;
        this.words = words;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Words> getWords() {
        return words;
    }

    public void setWords(List<Words> words) {
        this.words = words;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", language='" + language + '\'' +
                ", client=" + client +
                '}';
    }
}
