package project.backend.saved_courses;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SavedCoursesServiceTest {

    @InjectMocks
    private SavedCoursesService savedCoursesService;

    @Mock
    private SavedCoursesRepository savedCoursesRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetSavedCoursesByClientId() {
        Long clientId = 1L;
        SavedCourses course1 = new SavedCourses();
        SavedCourses course2 = new SavedCourses();
        List<SavedCourses> savedCoursesList = List.of(course1, course2);

        when(savedCoursesRepository.findByClient_Id(clientId)).thenReturn(savedCoursesList);

        List<SavedCourses> result = savedCoursesService.getSavedCoursesByClientId(clientId);

        assertEquals(2, result.size());
        verify(savedCoursesRepository, times(1)).findByClient_Id(clientId);
    }

    @Test
    void testGetSavedCourseByCourseId() {
        Long courseId = 1L;
        SavedCourses savedCourse = new SavedCourses();

        when(savedCoursesRepository.findByCourseId(courseId)).thenReturn(Optional.of(savedCourse));

        SavedCourses result = savedCoursesService.getSavedCourseByCourseId(courseId);

        assertNotNull(result);
        verify(savedCoursesRepository, times(1)).findByCourseId(courseId);
    }

    @Test
    void testGetSavedCourseByCourseIdNotFound() {
        Long courseId = 1L;

        when(savedCoursesRepository.findByCourseId(courseId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> savedCoursesService.getSavedCourseByCourseId(courseId));
    }

    @Test
    void testSaveSavedCourse() {
        SavedCourses savedCourse = new SavedCourses();

        when(savedCoursesRepository.save(savedCourse)).thenReturn(savedCourse);

        SavedCourses result = savedCoursesService.save(savedCourse);

        assertNotNull(result);
        verify(savedCoursesRepository, times(1)).save(savedCourse);
    }

    @Test
    void testDeleteByCourseId() {
        Long courseId = 1L;

        savedCoursesService.deleteByCourseId(courseId);

        verify(savedCoursesRepository, times(1)).deleteByCourseId(courseId);
    }
}
