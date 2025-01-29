import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import {getCourses, getCoursesByClientId} from "../hooks/hooks";
import British from "../Photos/Brithish.jpg";
import Spanish from "../Photos/Spanish.jpg";
import Polish from "../Photos/Polish.jpg";
import UserNavbar from "./UserNavbar";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getImageByLanguage } from "../hooks/helpers";

const ShowAllCourses = () => {
    const [coursesList, setCoursesList] = useState([]);
    const { clientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCourses();
            setCoursesList(data);
            console.log(data);
        };
        fetchData();
    }, []);

// Function to chunk the courses list into arrays of 5 courses
    const chunkCourses = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };


    // Calculate proportional height based on width for maintaining 4:3 aspect ratio
    const calculateProportionalHeight = (width) => {
        return (width / 345) * 140;
    };

    return (
        <div>
            {clientId ? <UserNavbar /> : <Navbar />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {chunkCourses(coursesList, 3).map((row, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                        {row.map(course => (
                            <Link key={course.id} to={clientId ? `/CourseHomePage/${clientId}/${course.id}` : "/Login"}>
                                <Card sx={{ width: 250, height: 300, margin: '10px' }}>
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
                                    {clientId == 3 && (
                                        <>
                                            <Button variant="contained">Edit</Button>
                                            <Button variant="contained">Delete</Button>
                                        </>
                                    )}
                                </Card>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAllCourses;
