package project.backend.saved_courses;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedCoursesService {
    private final SavedCoursesRepository savedCoursesRepository;

    @Autowired
    public SavedCoursesService(SavedCoursesRepository savedCoursesRepository) {
        this.savedCoursesRepository = savedCoursesRepository;
    }

    public List<SavedCourses> getSavedCoursesByClientId(Long clientId) {
        return savedCoursesRepository.findByClient_Id(clientId);
    }

    public SavedCourses save(SavedCourses savedCourses) {
        return savedCoursesRepository.save(savedCourses);
    }

    @Transactional
    public void deleteByCourseId(Long courseId) {
        savedCoursesRepository.deleteByCourseId(courseId);
    }
}
