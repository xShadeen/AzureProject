import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { getCourses, getClientById, deleteCourse } from "../hooks/hooks"; // Importujemy deleteCourse
import { getImageByLanguage } from "../hooks/helpers";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserNavbar from "./UserNavbar";
import Navbar from "./Navbar";

const ShowAllCourses = () => {
    const [coursesList, setCoursesList] = useState([]);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const { clientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCourses();
                setCoursesList(data);
            } catch (err) {
                setError('Nie udało się załadować kursów');
                console.error(err);
            }
        };

        const fetchUserRole = async () => {
            try {
                if (clientId) {
                    const userData = await getClientById(clientId);
                    setUserRole(userData.role);
                }
            } catch (err) {
                console.error("Błąd podczas pobierania roli użytkownika", err);
            }
        };

        fetchData();
        fetchUserRole();
    }, [clientId]);

    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourse(courseId);
            setCoursesList(prevCourses => prevCourses.filter(course => course.id !== courseId));
        } catch (error) {
            console.error("Błąd podczas usuwania kursu:", error);
        }
    };

    const chunkCourses = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    const calculateProportionalHeight = (width) => {
        return (width / 345) * 140;
    };

    return (
        <div>
            {clientId ? <UserNavbar /> : <Navbar />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {error && <Typography color="error">{error}</Typography>}
                {chunkCourses(coursesList, 3).map((row, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                        {row.map(course => (
                            <Card key={course.id} sx={{ width: 250, height: 300, margin: '10px' }}>
                                <Link to={clientId ? `/CourseHomePage/${clientId}/${course.id}` : "/Login"} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                                </Link>
                                {userRole === "ADMIN" && (
                                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                                         <Button variant="contained" color="primary" component={Link} to={`/EditCourse/${clientId}/${course.id}`}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteCourse(course.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAllCourses;
