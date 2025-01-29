import React from 'react';
import { useParams } from 'react-router-dom';
import ShowAllCourses from "../../components/ShowAllCourses";

const UserPage = () => {
    const { clientId } = useParams();

    return (
        <div>
            <ShowAllCourses/>
        </div>
    );
};

export default UserPage;
