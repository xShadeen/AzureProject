export const getIdByLogin = async (login, password) => {
    const res = await fetch('http://localhost:8080/api/clients/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password })
    });

    if (!res.ok) {
        throw new Error('Invalid login or password');
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data;
};

export const getClientById = async (clientId) => {
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`http://localhost:8080/api/clients/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            console.error(`Error: ${res.status} - ${res.statusText}`);
            throw new Error('Failed to fetch client data');
        }

        const data = await res.json();
        console.log("Client data:", data);
        return data;

    } catch (error) {
        console.error('Error during fetch:', error);
        throw new Error('Failed to fetch client data');
    }
};


export const registerUser = async (login, password) => {
    const res = await fetch('http://localhost:8080/api/clients/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    });

    if (!res.ok) {
        throw new Error('Failed to register');
    }

    const data = await res.json();
    console.log('Registration successful:', data);
    return data;
};

export const validateToken = async (token) => {
    try {
        const res = await fetch('http://localhost:8080/api/clients/validate-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Invalid or expired token');
        }

        console.log('Token is valid');
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

export const fetchData = async () => {
    const token = localStorage.getItem('token');


    const res = await fetch('http://localhost:8080/api/some-protected-endpoint', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Unauthorized');
    }

    return await res.json();
};

export const addCourse = async (data, clientId) => {
    const token = localStorage.getItem('token'); 

    const res = await fetch(`http://localhost:8080/api/courses/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            ...data,
            clientId: clientId
        }), 
    });

    if (!res.ok) {
        throw new Error('Failed to add course'); 
    }


    return await res.json();
};





export const getCoursesByClientId = async (clientId) => {
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`http://localhost:8080/api/courses/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            console.error(`Error: ${res.status} - ${res.statusText}`);
            throw new Error('Failed to fetch courses');
        }

        const data = await res.json();
        console.log("Courses data:", data);
        return data;

    } catch (error) {
        console.error('Error during fetch:', error);
        throw new Error('Failed to fetch courses');
    }
};



export const getCourseById = async (courseId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:8080/api/courses/get/${courseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch courses');
    }

    return await res.json();
};

export const getCourses = async () => {
    const res = await fetch(`http://localhost:8080/api/courses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch courses');
    }

    return await res.json();
};

export const deleteCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:8080/api/courses/delete/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to delete course');
    }

    return true;
};

export const updateCourse = async (data, courseId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:8080/api/courses/update/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to update course');
    }

    return await res.json();
};

//SavedCourses
export const saveCourse = async (clientId, courseId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:8080/api/saved_courses/${clientId}/${courseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to add course');
    }

    return await res.json();
};

export const getSavedCoursesByClientId = async (clientId) => {
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`http://localhost:8080/api/saved_courses/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            console.error(`Failed to fetch saved courses: ${res.status} ${res.statusText}`);
            throw new Error('Failed to fetch saved courses');
        }

        return await res.json();
    } catch (error) {
        console.error('Error during fetching saved courses:', error);
        throw error;
    }
};


export const deleteSavedCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:8080/api/saved_courses/delete/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to delete course');
    }

    return true;
};

//Words
export const addWord = async (data, courseId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:8080/api/words/add/${courseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to add word');
    }

    return await res.json();
};

export const getWordsByCourseId = async (courseId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:8080/api/words/${courseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch words');
    }

    return await res.json();
};

export const deleteWord = async (wordId) => {
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`http://localhost:8080/api/words/delete/${wordId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to delete word');
        }

        return true;
    } catch (error) {
        throw new Error('Failed to delete word');
    }
};
