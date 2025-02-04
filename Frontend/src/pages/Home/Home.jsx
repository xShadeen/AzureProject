import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getCourses, getCoursesByClientId } from "../../hooks/hooks";
import { getImageByLanguage } from "../../hooks/helpers";
import ShowAllCourses from "../../components/ShowAllCourses";

const Home = () => {
    const [coursesList, setCoursesList] = useState([]);
    const { clientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCourses();
            setCoursesList(data);
            console.log(data);
        };
        fetchData();
    }, [clientId]);

    return (
        <div>
            <ShowAllCourses />
        </div>
    );
};

export default Home;
