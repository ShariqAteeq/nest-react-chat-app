import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = async (email, password) => {};
export const signup = (username, email, password) => {
  return axios.post("/api/user", { username, email, password }, config);
};
