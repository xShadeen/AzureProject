package project.backend.saved_courses;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import project.backend.client.Client;
import project.backend.courses.Course;

@Entity
@Table(name = "saved_courses")
public class SavedCourses {

    @Id
    @SequenceGenerator(
            name = "saved_courses_sequence",
            sequenceName = "saved_courses_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "saved_courses_sequence"
    )
    private Long id;

    @JsonBackReference("course_savedCoursesReference")
    @ManyToOne
    @JoinColumn(name = "course_id", insertable = false, updatable = false)
    private Course course;

    @JsonBackReference("client_savedCoursesReference")
    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false, insertable = false, updatable = false)
    private Client client;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "client_id", nullable = false)
    private Long clientId;

    public SavedCourses() {
    }

    public SavedCourses(Course course, Client client) {
        this.course = course;
        this.client = client;
        this.courseId = course.getId();
        this.clientId = client.getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
        this.courseId = course.getId();
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
        this.clientId = client.getId();
    }

    @JsonProperty("clientId")
    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    @JsonProperty("courseId")
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    @Override
    public String toString() {
        return "SavedCourses{" +
                "id=" + id +
                ", clientId=" + clientId +
                ", courseId=" + courseId +
                ", course=" + course +
                ", client=" + client +
                '}';
    }
}
