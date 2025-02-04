package project.backend.words_service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import project.backend.courses.Course;
import project.backend.words.Words;
import project.backend.words.WordsRepository;
import project.backend.words.WordsService;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WordsServiceTest {

    @InjectMocks
    private WordsService wordsService;

    @Mock
    private WordsRepository wordsRepository;

    @Mock
    private Course course;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllWordsByCourseId() {
        Long courseId = 1L;
        Words word1 = new Words("word1", "translation1", "description1", course);
        Words word2 = new Words("word2", "translation2", "description2", course);
        List<Words> wordsList = List.of(word1, word2);

        when(wordsRepository.findByCourse_Id(courseId)).thenReturn(wordsList);

        List<Words> result = wordsService.getAllWordsByCourseId(courseId);

        assertEquals(2, result.size());
        verify(wordsRepository, times(1)).findByCourse_Id(courseId);
    }

    @Test
    void testSaveWord() {
        Words word = new Words("word", "translation", "description", course);

        when(wordsRepository.save(word)).thenReturn(word);

        Words result = wordsService.saveWord(word);

        assertNotNull(result);
        verify(wordsRepository, times(1)).save(word);
    }

    @Test
    void testDeleteWord() {
        Long wordId = 1L;

        wordsService.deleteWord(wordId);

        verify(wordsRepository, times(1)).deleteById(wordId);
    }

    @Test
    void testGetAllWordsByCourseIdWhenNoWordsFound() {
        Long courseId = 1L;

        when(wordsRepository.findByCourse_Id(courseId)).thenReturn(List.of());

        List<Words> result = wordsService.getAllWordsByCourseId(courseId);

        assertTrue(result.isEmpty());
        verify(wordsRepository, times(1)).findByCourse_Id(courseId);
    }
}
