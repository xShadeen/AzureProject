import React, { useEffect, useState } from 'react';
import UserNavbar from "../../components/UserNavbar";
import { Container, Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import { addWord, deleteWord, getWordsByCourseId } from "../../hooks/hooks";
import {Link, useParams} from "react-router-dom";

const AddWords = () => {
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [description, setDescription] = useState('');
    const [words, setWords] = useState([]);
    const { courseId } = useParams();
    const { clientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWordsByCourseId(courseId)
            setWords(data);
        };

        fetchData();
    }, [courseId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            word: word,
            translation: translation,
            description: description
        }
        const res = await addWord(data, courseId)

        setWords([...words, data]);

        window.location.reload();
    };

    const handleDelete = async (wordId) => {
        console.log(wordId);
        try {
            const res = await deleteWord(wordId);
            console.log("Word deleted");
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <div>
            <UserNavbar />
            <Container maxWidth="md">
                <Card sx={{ my: 4 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Add New Word
                        </Typography>
                        {/* Formularz */}
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* Pole na słówko */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Word"
                                        variant="outlined"
                                        fullWidth
                                        value={word}
                                        onChange={(e) => setWord(e.target.value)}
                                        required={true}
                                    />
                                </Grid>
                                {/* Pole na tłumaczenie */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Translation"
                                        variant="outlined"
                                        fullWidth
                                        value={translation}
                                        onChange={(e) => setTranslation(e.target.value)}
                                        required={true}
                                    />
                                </Grid>
                                {/* Pole na opis */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Add Word
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ mt: 2, ml: 2 }}
                                component={Link}
                                to={`/Course/OwnCourses/${clientId}`}
                            >
                                Save
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            {/* Lista słówek */}
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {words.map((item, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="body1">
                                {item.word} - {item.translation}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDelete(item.id)}
                                sx={{ mt: 1 }}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

export default AddWords;
