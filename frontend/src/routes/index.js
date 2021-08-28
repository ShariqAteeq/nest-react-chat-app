import React from "react";
import { Switch } from "react-router-dom";
import PublicRoute from "./publicRoute";
import Home from "../components/home";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import PrivateRoute from "./privateRoute";
import Chat from "../components/chat";

const Routes = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute restricted={false} component={Home} path="/" exact />
        <PrivateRoute restricted={false} component={Chat} path="/chat" exact />
        <PublicRoute restricted={true} component={Login} path="/signin" exact />
        <PublicRoute
          restricted={true}
          component={Signup}
          path="/signup"
          exact
        />
      </Switch>
    </div>
  );
};

export default Routes;
