import React, { useEffect, useState } from 'react';
import UserNavbar from "../../components/UserNavbar";
import { Link, useParams } from "react-router-dom";
import {getCourseById, getSavedCoursesByClientId, saveCourse} from "../../hooks/hooks";
import { getImageByLanguage } from "../../hooks/helpers";
import Button from "@mui/material/Button";
import { Container, Typography, Card, CardContent, CardActions, Grid } from '@mui/material';

const CourseHomePage = () => {
    const [course, setCourse] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const { clientId, courseId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCourseById(courseId);
                const savedCourses = await getSavedCoursesByClientId(clientId);
                for (let savedCourse of savedCourses) {
                    if (String(savedCourse.courseId) === String(courseId)) {
                        setIsSaved(true);
                    }
                }
                setCourse(data);
            } catch (error) {
                console.error('Error during fetching course:', error);
            }
        };
        fetchData();
    }, [courseId, clientId]);

    useEffect(() => {
        console.log(isSaved);
    }, [isSaved]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await saveCourse(clientId, courseId);
            console.log("Pomyślnie rozpoczęto kurs");
            window.location.href = `/Course/${clientId}/${courseId}`;
        } catch (error) {
            console.error('Error during saving course:', error);
        }
    };

    return (
        <div>
            <UserNavbar />
            <Container maxWidth="md">
                <Card sx={{ my: 4 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <img src={getImageByLanguage(course.language)} alt="CourseHomePage Image" style={{ maxWidth: '130%', height: '123%' }} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4" gutterBottom sx={{ maxWidth: '80%', overflowWrap: 'break-word', marginLeft: 'auto' }}>
                                    {course.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ maxWidth: '80%', overflowWrap: 'break-word', marginLeft: 'auto' }}>
                                    {course.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end" sx={{ pt: 0 }}>
                            {isSaved ?
                                <Button
                                variant="contained"
                                color="primary"
                                sx={{ mr: 4 }}
                                component = {Link}
                                to={`/Course/${clientId}/${courseId}`}
                            >
                                Continue Course
                            </Button> :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mr: 4 }}
                                    onClick={handleSubmit}
                                >
                                    Start Course
                                </Button>}
                        </Grid>
                    </CardActions>
                </Card>
            </Container>
        </div>
    );
};

export default CourseHomePage;
