import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { deleteCourse, getCourseById, getCoursesByClientId, getSavedCoursesByClientId } from "../../hooks/hooks";
import { getImageByLanguage } from "../../hooks/helpers"; // Importujemy z helpers
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserNavbar from "../../components/UserNavbar";

const OwnCourses = () => {
    const [savedCourses, setSavedCourses] = useState([]);
    const [ownCourses, setOwnCourses] = useState([]);
    const { clientId } = useParams(); // Pobieramy clientId z URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedCoursesRes = await getSavedCoursesByClientId(clientId);
                const ownCoursesRes = await getCoursesByClientId(clientId);

                const fetchedSavedCourses = [];
                for (const savedCourse of savedCoursesRes) {
                    fetchedSavedCourses.push(await getCourseById(savedCourse.courseId));
                }

                setSavedCourses(fetchedSavedCourses);
                setOwnCourses(ownCoursesRes);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, [clientId]);

    const handleDeleteClick = async (courseId) => {
        try {
            await deleteCourse(courseId);
            setOwnCourses((prevCourses) => prevCourses.filter(course => course.id !== courseId));
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    };
    const calculateProportionalHeight = (width) => {
        return (width / 345) * 140; // Maintains a 4:3 aspect ratio
    };

    return (
        <div>
            <UserNavbar />
            <div>
                <h2>Started Courses</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {savedCourses.length === 0 ? (
                        <Typography variant="h6" color="text.secondary">No saved courses found.</Typography>
                    ) : (
                        savedCourses.map(course => (
                            <Card key={course.id} sx={{ width: 250, height: 300, margin: '10px' }}>
                                <CardActionArea component={Link} to={`/CourseHomePage/${clientId}/${course.id}`}>
                                    <CardMedia
                                        component="img"
                                        height={calculateProportionalHeight(345)}
                                        image={getImageByLanguage(course.language)}
                                        alt={course.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {course.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <Button variant="contained" component={Link} to={`/Course/${clientId}/${course.id}`}>
                                    Continue
                                </Button>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            <div>
            <h2>Your Courses</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {ownCourses.length === 0 ? (
                    <Typography variant="h6" color="text.secondary">No own courses found.</Typography>
                ) : (
                    ownCourses.map(course => (
                        <Card key={course.id} sx={{ width: 250, height: 300, margin: '10px' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height={calculateProportionalHeight(345)}
                                    image={getImageByLanguage(course.language)}
                                    alt={course.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Button 
                                variant="contained" 
                                component={Link} 
                                to={`/EditCourse/${clientId}/${course.id}`}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={() => handleDeleteClick(course.id)}
                            >
                                Delete
                            </Button>
                        </Card>
                    ))
                )}
            </div>
        </div>

        </div>
    );
};

export default OwnCourses;
