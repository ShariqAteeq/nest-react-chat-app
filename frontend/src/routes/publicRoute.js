import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            false && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;