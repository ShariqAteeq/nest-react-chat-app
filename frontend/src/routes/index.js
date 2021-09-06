import React from "react";
import { Switch } from "react-router-dom";
import PublicRoute from "./publicRoute";
import Home from "../components/home";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import PrivateRoute from "./privateRoute";
import Messenger from "../components/Messaging/Messenger";
import Profile from "../components/Profile";
import Feeds from "../components/Feeds";

const Routes = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute component={Home} path="/" exact />
        <PrivateRoute component={Messenger} path="/inbox" exact />
        <PrivateRoute component={Profile} path="/profile" exact />
        <PrivateRoute component={Feeds} path="/feeds" exact />
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
