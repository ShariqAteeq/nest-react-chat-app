import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Routes from "./routes";
import { ThemeContext } from "./utils/helper";
import useFindUser from "./components/hooks/useFindUser";
import { io } from "socket.io-client";
import { NavBar } from "./components/Navbar";

axios.defaults.baseURL = "http://localhost:3000/";

const App = () => {
  const { user, setUser, isLoading, setToken, token } = useFindUser();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      const newSocket = io(`http://localhost:3000`, { auth: { token } });
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [setSocket, user]);

  return (
    <ThemeContext.Provider
      value={{ user, setUser, isLoading, setToken, socket, token }}
    >
      {user && <NavBar />}
      <Routes />
      <Toaster />
    </ThemeContext.Provider>
  );
};

export default App;
