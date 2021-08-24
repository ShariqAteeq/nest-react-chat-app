import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./routes/publicRoute";
// import PrivateRoute from "./routes/privateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact />
        <PublicRoute restricted={true} component={Login} path="/signin" exact />
        <PublicRoute
          restricted={true}
          component={Signup}
          path="/signup"
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
