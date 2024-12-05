import React from 'react';
import { Navigate } from 'react-router-dom';
import Main from './Main';
function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
        return (
        
            <>
            {
            isAuthenticated ? (
                <Main {...rest} />
            ) : (
             <Navigate to  ={{
             pathname: "/signin",
             state: {from: rest.location }
             }}
            
             />
            )}
            </>
    );
}

export default ProtectedRoute;