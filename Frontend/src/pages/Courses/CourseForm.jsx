import React, { useState, useEffect } from 'react';
import UserNavbar from "../../components/UserNavbar";
import { useParams } from "react-router-dom";
import { addCourse } from "../../hooks/hooks";

const CourseForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('English');
    const { clientId } = useParams();
    const maxCharacters = 300;

    useEffect(() => {
        if (!clientId) {
            console.error('Client ID is undefined');
        }
    }, [clientId, description, title]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= maxCharacters) {
            setDescription(inputValue);
        }
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!clientId) {
            console.error('Client ID is undefined');
            return;
        }

        const data = {
            title: title,
            description: description,
            language: language
        };

        try {
            const res = await addCourse(data, clientId);
            console.log('Course added successfully:', res);

            window.location.href = `/Course/OwnCourses/${clientId}`;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <UserNavbar />
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Add Course</h2>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        />
                    </label>
                    <label>
                        Language:
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="English">English</option>
                            <option value="Polish">Polish</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                    </label>
                    <button type="submit">Add Course</button>
                </form>
            </div>
        </div>
    );
};

export default CourseForm;
