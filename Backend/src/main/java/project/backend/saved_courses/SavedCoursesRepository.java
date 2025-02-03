package project.backend.saved_courses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedCoursesRepository extends JpaRepository<SavedCourses, Long> {
    List<SavedCourses> findByClient_Id(Long clientId);

    void deleteByCourseId(Long courseId);

    Optional<Object> findByCourseId(Long courseId);
}

