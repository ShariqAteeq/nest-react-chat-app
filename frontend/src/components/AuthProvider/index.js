import React, { useEffect, useState } from "react";
import { ThemeContext } from "../../utils/helper";
import axios from "axios";
import { errorResponse } from "../../utils/helper";
import {
  getCookie,
  clearCookies,
  getJwtDecoded,
  checkTokenExpiration,
} from "../../utils/manageCookies";
import { Redirect, useHistory } from "react-router-dom";

const AuthProvider = ({ children }) => {
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

  async function _getJwtToken() {
    const jwt = getCookie("access_token");
    let decodedToken = "";
    if (jwt) {
      decodedToken = getJwtDecoded(jwt);
      if (checkTokenExpiration(decodedToken.exp)) {
        clearCookies(setUser);
      } else {
        let res = await getUser(decodedToken?.user?.id);
        setUser(res);
      }
    }
  }

  useEffect(() => {
     _getJwtToken();
  }, [history]);

  return (
    <ThemeContext.Provider value={{ user, setUser }}>
    {(() => {
      if(user) {
        <Redirect to = "/" />
      }
    })()} 
    </ThemeContext.Provider>
  );
};

export default AuthProvider;
