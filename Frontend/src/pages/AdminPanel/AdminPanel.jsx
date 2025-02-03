import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getCoursesByClientId } from "../../hooks/hooks";
import { getImageByLanguage } from "../../hooks/helpers"; // Importujemy z helpers
import British from "../../Photos/Brithish.jpg";
import Spanish from "../../Photos/Spanish.jpg";
import Polish from "../../Photos/Polish.jpg";
import UserNavbar from "../../components/UserNavbar";
import ShowAllCourses from '../../components/ShowAllCourses';

const AdminPanel = () => {
    const [coursesList, setCoursesList] = useState([]);
    const { clientId } = useParams(); // Pobieramy clientId z URL

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCoursesByClientId(clientId); // Używamy clientId z URL
            setCoursesList(data);
            console.log(data);
        };
        fetchData();
    }, [clientId]); // Dodajemy clientId do zależności useEffect

    return (
        <div>
            <div>
                <div>
                    <ShowAllCourses/>
                 </div>
            </div>
        </div>
    );
};

export default AdminPanel;
