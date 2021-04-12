import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, role } = useSelector(state => state.Auth);

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    if (role && rest.role && role !== rest.role) {
        return <Redirect to={`/${role}`} />
    }

    return (
        <Route {...rest} render={props => <Component {...props} />} />
    );
}

export default PrivateRoute