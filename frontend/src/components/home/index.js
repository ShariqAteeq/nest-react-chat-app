import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../utils/helper";
import { clearCookies } from "../../utils/manageCookies";

const Home = () => {
  const { user, setUser, socket } = useContext(ThemeContext);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const getMessage = (msgs) => {
      let o = [...msgs];
      setMsg(o);
    };

    socket.on("message", getMessage);
    // socket.emit("message");

    return () => {
      socket.off("message", getMessage);
    };
  }, [socket]);

  return (
    <div>
      {user?.username}
      <button onClick={() => clearCookies(setUser)}>logout</button>
      <p>{msg.map((i) => i)}</p>
    </div>
  );
};

export default Home;
