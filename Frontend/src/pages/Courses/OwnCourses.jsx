import React, { useEffect, useState } from 'react';
import UserNavbar from "../../components/UserNavbar";
import { useParams, Link } from "react-router-dom";
import {
    deleteCourse,
    deleteSavedCourse,
    getCourseById,
    getCoursesByClientId,
    getSavedCoursesByClientId
} from "../../hooks/hooks";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getImageByLanguage } from "../../hooks/helpers";

const OwnCourses = () => {
    const [savedCourses, setSavedCourses] = useState([]);
    const [ownCourses, setOwnCourses] = useState([]);
    const { clientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const savedCoursesRes = await getSavedCoursesByClientId(clientId);
            const ownCoursesRes = await getCoursesByClientId(clientId);

            const fetchedSavedCourses = [];
            for (const savedCourse of savedCoursesRes) {
                fetchedSavedCourses.push(await getCourseById(savedCourse.courseId));
            }

            setSavedCourses(fetchedSavedCourses);
            setOwnCourses(ownCoursesRes);
        };

        fetchData();
    }, [clientId]);

    // Calculate proportional height based on width for maintaining 4:3 aspect ratio
    const calculateProportionalHeight = (width) => {
        return (width / 345) * 140;
    };

    const handleDeleteClick = async (courseId) => {
        try {
            await deleteCourse(courseId);
            setOwnCourses((prevCourses) => prevCourses.filter(course => course.id !== courseId));
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    };

    function handleEditClick(id) {

    }

    return (
        <div>
            <UserNavbar />
            <div>
                <h2>Started Courses</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {savedCourses.map(course => (
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
                            <Button
                                variant="contained"
                                component={Link}
                                to={`/Course/${clientId}/${course.id}`}
                            >
                                Continue
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
            <div>
                <h2>Your Courses</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {ownCourses.map(course => (
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
                                onClick={() => handleEditClick(course.id)}
                                component = {Link}
                                to = {`/EditCourse/${clientId}/${course.id}`}
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OwnCourses;
