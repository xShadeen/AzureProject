package project.backend.client;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import project.backend.courses.Course;
import project.backend.saved_courses.SavedCourses;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "client")
public class Client {

    @Id
    @SequenceGenerator(
            name = "client_sequence",
            sequenceName = "client_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "client_sequence"
    )
    private Long id;

    private String login;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonManagedReference("client_coursesReference")
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Course> courses = new ArrayList<>();

    @JsonManagedReference("client_savedCoursesReference")
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<SavedCourses> savedCourses = new ArrayList<>();

    public Client() {
        this.role = Role.USER;
    }

    public Client(Long id, String login, String password) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.role = Role.USER;
    }

    public Client(String login, String password) {
        this.login = login;
        this.password = password;
        this.role = Role.USER;
    }

    public Client(long l, String user1, String pass, Role role) {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public List<SavedCourses> getSavedCourses() {
        return savedCourses;
    }

    public void setSavedCourses(List<SavedCourses> savedCourses) {
        this.savedCourses = savedCourses;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                '}';
    }
}
