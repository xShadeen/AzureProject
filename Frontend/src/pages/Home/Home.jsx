import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getCourses, getCoursesByClientId } from "../../hooks/hooks";
import { getImageByLanguage } from "../../hooks/helpers"; // Importujemy z helpers
import ShowAllCourses from "../../components/ShowAllCourses"; // Importujemy ShowAllCourses

const Home = () => {
    const [coursesList, setCoursesList] = useState([]);
    const { clientId } = useParams(); // Pobieramy clientId z URL

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCourses(); // Używamy clientId z URL
            setCoursesList(data);
            console.log(data);
        };
        fetchData();
    }, [clientId]); // Dodajemy clientId do zależności useEffect

    return (
        <div>
            <ShowAllCourses /> {/* Wywołujemy ShowAllCourses */}
        </div>
    );
};

export default Home;
