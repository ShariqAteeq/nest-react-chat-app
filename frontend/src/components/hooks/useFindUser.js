import axios from "axios";
import { useEffect, useState } from "react";
import { errorResponse } from "../../utils/helper";
import {
  getCookie,
  clearCookies,
  getJwtDecoded,
  checkTokenExpiration,
} from "../../utils/manageCookies";
export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(undefined);
  const [isLoading, setLoading] = useState(true);

  const getUser = async (id) => {
    try {
      const { data } = await axios.get(`/api/user/get_one/${id}`);
      return data;
    } catch (error) {
      errorResponse(error);
    }
  };

  useEffect(() => {
    async function findUser() {
      let jwt = getCookie("access_token");
      setToken(jwt);
      let decodedToken = "";
      if (jwt) {
        decodedToken = getJwtDecoded(jwt);
        if (checkTokenExpiration(decodedToken.exp)) {
          clearCookies(setUser);
          setLoading(false);
        } else {
          let res = await getUser(decodedToken?.user?.id);
          setUser(res);
          setLoading(false);
        }
      }
      setLoading(false);
    }
    findUser();
  }, []);
  return {
    user,
    setUser,
    isLoading,
    setToken,
    token
  };
}
