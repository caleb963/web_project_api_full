const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then((response) => {
        if (!response.ok){
            return Promise.reject(`Error: ${response.status}`);
        }
       return  response.json();
    });
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(`Error: ${response.status}`);
        }
    return response.json();
});
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(`Error: ${response.status}`);
        }
        return response.json();
    });
};