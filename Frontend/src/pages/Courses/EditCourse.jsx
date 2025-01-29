import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {addCourse, getCourseById, updateCourse} from "../../hooks/hooks";
import UserNavbar from "../../components/UserNavbar";

const EditCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('English'); // State to store the selected language
    const { courseId, clientId } = useParams();
    const maxCharacters = 300;

    useEffect(() => {
        const fetchData = async () => {
            const course = await getCourseById(courseId)
            setTitle(course.title)
            setDescription(course.description)
            setLanguage(course.language)
            console.log(course)
        }
        fetchData()
    }, []);

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


        const data = {
            // clientId: clientId,
            title: title,
            description: description,
            language: language
        }
        console.log(data)
        try {
            const res = await updateCourse(data, courseId);
            console.log('Course Updated:', res);
        } catch (error) {
            console.error('Err', error);
        }
    };
    return (
        <div>
            <UserNavbar/>
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Edit</h2>
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
                    <Link to={`/AddWords/${clientId}/${courseId}`}>
                        <button type="submit">Next Step</button>
                    </Link>

                </form>
            </div>
        </div>
    );
};


export default EditCourse;