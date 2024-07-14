import React from 'react';
import {Navigate, Route} from 'react-router-dom';
function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
}
export default PrivateRoute;