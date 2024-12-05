    import React from 'react';
    import  {Routes, Route, Navigate } from 'react-router-dom';
    import Register from './components/Register';
    import Login from './components/Login';

    function AuthRoutes() {
        return (
            <Routes>
                <Route path="/signup" element={<Register />} />
                <Route path='/signin' element={<Login />} />
                <Route path="*" element={<Navigate to="/signin" />} />
            </Routes>
        );
    }

    export default AuthRoutes;