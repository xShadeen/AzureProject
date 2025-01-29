import React, { useEffect, useState } from 'react';
import UserNavbar from "../../components/UserNavbar";
import { useParams } from "react-router-dom";
import { getWordsByCourseId } from "../../hooks/hooks";

const Course = () => {
    const { clientId, courseId } = useParams();
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const wordsData = await getWordsByCourseId(courseId);
            setWords(wordsData);
        };
        fetchData();
    }, [clientId, courseId]);

    const handleNextWord = () => {
        setCurrentIndex(currentIndex + 1);
        setShowTranslation(false);
        setShowButtons(false);
    };

    const handleKnow = () => {
        handleNextWord();
    };

    const handleNotSure = () => {
        handleNextWord();
    };

    const handleCheckTranslation = () => {
        setShowTranslation(true);
        setShowButtons(true);
    };

    return (
        <div>
            <UserNavbar />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", minHeight: "100vh", padding: "20px" }}>
                {words.length > 0 && currentIndex < words.length && (
                    <div style={{ alignSelf: "flex-start", textAlign: "left" }}>
                        <h2 style={{ fontSize: "2em", fontWeight: "bold", marginBottom: "0.5em", textAlign: "left" }}>{words[currentIndex].word}</h2>
                        <p style={{ fontStyle: "italic", fontSize: "1.2em", marginBottom: "0.5em", textAlign: "left" }}>{words[currentIndex].description}</p>
                        {showTranslation && <p style={{ fontSize: "1.2em", marginTop:"300px", textAlign: "left" }}>{words[currentIndex].translation}</p>}
                    </div>
                )}
            </div>
            {currentIndex < words.length ? (
                <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", display: "flex", justifyContent: "center", padding: "10px", backgroundColor: "#fff" }}>
                    {showButtons ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button onClick={handleNotSure} style={{ backgroundColor: "red", color: "white", padding: "15px 30px", borderRadius: "8px", fontSize: "16px" }}>Don't know</button>
                            <button onClick={handleKnow} style={{ backgroundColor: "green", color: "white", padding: "15px 30px", borderRadius: "8px", fontSize: "16px", marginRight: "20px" }}>Know</button>
                        </div>
                    ) : (
                        <button onClick={handleCheckTranslation} style={{ backgroundColor: "yellow", color: "black", padding: "15px 30px", borderRadius: "8px", fontSize: "16px" }}>Check</button>
                    )}
                </div>
            ) : (
                <p style={{ position: "fixed", bottom: 0, left: 0, width: "100%", padding: "10px", backgroundColor: "#fff" }}>That's all the vocabulary in the course.</p>
            )}
        </div>
    );
};

export default Course;
