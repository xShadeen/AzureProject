package project.backend.course_service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import project.backend.client.Client;
import project.backend.courses.Course;
import project.backend.courses.CourseRepository;
import project.backend.courses.CourseService;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private Client client;

    @InjectMocks
    private CourseService courseService;

    private Course course1;
    private Course course2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        course1 = new Course(1L, "Course 1", "Description 1", "English", client, null);
        course2 = new Course(2L, "Course 2", "Description 2", "French", client, null);
    }

    @Test
    void testGetCoursesByClientId() {
        when(courseRepository.findByClientId(1L)).thenReturn(Arrays.asList(course1, course2));

        List<Course> courses = courseService.getCoursesByClientId(1L);

        assertEquals(2, courses.size());
        assertEquals("Course 1", courses.get(0).getTitle());
        assertEquals("Course 2", courses.get(1).getTitle());

        verify(courseRepository, times(1)).findByClientId(1L);
    }

    @Test
    void testSaveCourse() {
        when(courseRepository.save(course1)).thenReturn(course1);

        Course savedCourse = courseService.saveCourse(course1);

        assertNotNull(savedCourse);
        assertEquals("Course 1", savedCourse.getTitle());

        verify(courseRepository, times(1)).save(course1);
    }

    @Test
    void testGetCourseById_Success() {
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course1));

        Course course = courseService.getCourseById(1L);

        assertNotNull(course);
        assertEquals("Course 1", course.getTitle());

        verify(courseRepository, times(1)).findById(1L);
    }

    @Test
    void testGetCourseById_NotFound() {
        when(courseRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(NoSuchElementException.class, () -> {
            courseService.getCourseById(1L);
        });

        assertEquals("Course not found with id: 1", exception.getMessage());

        verify(courseRepository, times(1)).findById(1L);
    }

    @Test
    void testGetCourses() {
        when(courseRepository.findAll()).thenReturn(Arrays.asList(course1, course2));

        List<Course> courses = courseService.getCourses();

        assertEquals(2, courses.size());
        assertEquals("Course 1", courses.get(0).getTitle());
        assertEquals("Course 2", courses.get(1).getTitle());

        verify(courseRepository, times(1)).findAll();
    }

    @Test
    void testDeleteCourse() {
        doNothing().when(courseRepository).deleteById(1L);

        courseService.deleteCourse(1L);

        verify(courseRepository, times(1)).deleteById(1L);
    }
}

