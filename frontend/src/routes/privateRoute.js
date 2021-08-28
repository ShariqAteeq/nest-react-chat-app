import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import { ThemeContext } from "../utils/helper";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useContext(ThemeContext);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/signin" />;
};

export default PrivateRoute;
