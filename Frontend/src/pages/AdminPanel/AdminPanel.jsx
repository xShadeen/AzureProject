import React, {useEffect, useState} from 'react';
import UserNavbar from "../../components/UserNavbar";
import {useParams} from "react-router-dom";
import {getCoursesByClientId} from "../../hooks/hooks";
import British from "../../Photos/Brithish.jpg";
import Spanish from "../../Photos/Spanish.jpg";
import Polish from "../../Photos/Polish.jpg";

const AdminPanel = () => {
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
            <UserNavbar/>
        </div>
    );
};

export default AdminPanel;