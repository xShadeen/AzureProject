import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import UserNavbar from './components/UserNavbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserPage from './pages/UserPage/UserPage';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import './App.css';
import CourseForm from './pages/Courses/CourseForm';
import CourseHomePage from "./pages/Courses/CourseHomePage";
import OwnCourses from './pages/Courses/OwnCourses';
import Course from "./pages/Courses/Course";
import EditCourse from "./pages/Courses/EditCourse";
import AddWords from "./pages/Courses/AddWords";


const AppContent = () => {
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:clientId" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/:clientId" element={<UserPage />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/user/:clientId/courseform" element={<CourseForm />} />
                    <Route path="/CourseHomePage/:clientId/:courseId" element={<CourseHomePage />} />
                    <Route path="/Course/OwnCourses/:clientId" element={<OwnCourses />} />
                    <Route path="/Course/:clientId/:courseId" element={<Course />} />
                    <Route path="/EditCourse/:clientId/:courseId" element={<EditCourse />} />
                    <Route path="/AddWords/:clientId/:courseId" element={<AddWords />} />
                </Routes>
            </div>
        </>
    );
};


function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
