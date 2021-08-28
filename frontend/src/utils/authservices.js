import axios from "axios";
import { clearCookies } from "./manageCookies";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signin = async (email, password) => {
  return axios.post("/api/user/login", { email, password }, config);
};
export const signup = (username, email, password) => {
  return axios.post("/api/user", { username, email, password }, config);
};

export const logout = (setUser) => {
  clearCookies(setUser);
};
