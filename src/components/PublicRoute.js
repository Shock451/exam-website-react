import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'


const PublicRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, role } = useSelector(state => state.Auth);

    if (isAuthenticated) {
        console.log(role);
        return <Redirect to={`/${role}`} />
    }

    return (
        <Route {...rest} render={props => <Component {...props} />} />
    );
}

export default PublicRoute