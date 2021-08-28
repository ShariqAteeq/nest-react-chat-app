import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ThemeContext } from "../utils/helper";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const { user } = useContext(ThemeContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
