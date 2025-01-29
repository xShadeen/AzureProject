import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import British from '../../Photos/Brithish.jpg';
import Polish from '../../Photos/Polish.jpg';
import Spanish from '../../Photos/Spanish.jpg';
import Navbar from "../../components/Navbar";
import UserNavbar from "../../components/UserNavbar";
import { getCoursesByClientId } from "../../hooks/hooks";
import {Link, useParams} from "react-router-dom";
import ShowAllCourses from "../../components/ShowAllCourses";


const Home = () => {
    const [coursesList, setCoursesList] = useState([]);
    const { clientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCoursesByClientId(3);
            setCoursesList(data);
            console.log(data);
        };
        fetchData();
    }, []);

    const getImageByLanguage = (language) => {
        switch (language) {
            case 'English':
                return British;
            case 'Spanish':
                return Spanish;
            case 'Polish':
                return Polish;
            default:
                return;
        }
    }

    return (
        <div>
            <ShowAllCourses/>
        </div>
    );
}

export default Home;
