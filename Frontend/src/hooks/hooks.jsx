export const getIdByLogin = async (login) => {
    const res = await fetch(`http://localhost:8080/api/clients/exists/${login}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to check login existence');

    }
    return await res.json();
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

    return await res.json();
};

//Course
export const addCourse = async (data, clientId) => {
    const res = await fetch(`http://localhost:8080/api/courses/add?clientId=${clientId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to add course');
    }

    return await res.json(); // Return response data if successful
};


export const getCoursesByClientId = async (clientId) => {
    const res = await fetch(`http://localhost:8080/api/courses/${clientId}`, {
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

export const getCourseById = async (courseId) => {
    const res = await fetch(`http://localhost:8080/api/courses/get/${courseId}`, {
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
    const res = await fetch(`http://localhost:8080/api/courses/delete/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to delete course');
    }

    return true; // Return true to indicate the deletion was successful
};

export const updateCourse = async (data, courseId) => {
    const res = await fetch(`http://localhost:8080/api/courses/update/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to add course');
    }

    return await res.json();
};
//SavedCourses

export const saveCourse = async (clientId, courseId) => {
    const res = await fetch(`http://localhost:8080/api/saved_courses/${clientId}/${courseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error('Failed to add course');
    }

    return await res.json();
};

export const getSavedCoursesByClientId = async (clientId) => {
    const res = await fetch(`http://localhost:8080/api/saved_courses/${clientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch courses');
    }

    return await res.json();
};

export const deleteSavedCourse = async (courseId) => {
    const res = await fetch(`http://localhost:8080/api/saved_courses/delete/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to delete course');
    }

    return true; // Return true to indicate the deletion was successful
};
//Words
export const addWord = async (data, courseId) => {
    const res = await fetch(`http://localhost:8080/api/words/add/${courseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to add course');
    }

    return await res.json();
};

export const getWordsByCourseId = async (courseId) => {
    const res = await fetch(`http://localhost:8080/api/words/${courseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch courses');
    }

    return await res.json();
};

export const deleteWord = async (wordId) => {
    try {
        const res = await fetch(`http://localhost:8080/api/words/delete/${wordId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to delete word');
        }

        return true; // Zwróć true, aby wskazać, że usunięcie było udane
    } catch (error) {
        throw new Error('Failed to delete word');
    }
};