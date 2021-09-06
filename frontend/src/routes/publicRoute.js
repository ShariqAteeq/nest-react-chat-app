import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ThemeContext } from '../utils/helper';

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const { user } = useContext(ThemeContext);

    return (
        <Route {...rest} render={props => (
            user && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;