package project.backend.words;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordsService {
    private  final WordsRepository wordsRepository;

    @Autowired
    public WordsService(WordsRepository wordsRepository) {
        this.wordsRepository = wordsRepository;
    }

    public List<Words> getAllWordsByCourseId(Long courseId){
        return wordsRepository.findByCourse_Id(courseId);
    }

    public Words saveWord(Words word) {
        return wordsRepository.save(word);
    }

    public void deleteWord(Long wordId) {
        wordsRepository.deleteById(wordId);
    }
}
