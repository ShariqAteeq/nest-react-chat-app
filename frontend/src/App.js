import "bootstrap/dist/css/bootstrap.min.css";

import { Toaster } from "react-hot-toast";
import axios from "axios";
import Routes from "./routes";
import { useEffect, useState } from "react";
import { errorResponse, ThemeContext } from "./utils/helper";
import {
  getCookie,
  clearCookies,
  getJwtDecoded,
  checkTokenExpiration,
} from "./utils/manageCookies";
import { useHistory } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000/";

const App = () => {
  const [user, setUser] = useState(null);

  const history = useHistory();

  const getUser = async (id) => {
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      return data;
    } catch (error) {
      errorResponse(error);
    }
  };

  const isAuthenticated = async () => {
    const jwt = getCookie("access_token");
    let decodedToken = "";
    if (jwt) {
      decodedToken = getJwtDecoded(jwt);
      if (checkTokenExpiration(decodedToken.exp)) {
        clearCookies(setUser);
      } else {
        let res = await getUser(decodedToken?.user?.id);
        setUser(res);
        history.push("/");
      }
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, [history]);

  return (
    <ThemeContext.Provider value={{ user, setUser }}>
      <Routes />
      <Toaster />
    </ThemeContext.Provider>
  );
};

export default App;
