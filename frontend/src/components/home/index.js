import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../utils/helper";
import { clearCookies } from "../../utils/manageCookies";

const Home = () => {
  const { user, setUser, socket } = useContext(ThemeContext);
  const [msg, setMsg] = useState([]);
  const [rooms, setRooms] = useState([]);

  // useEffect(() => {
  //   const getMessage = (msgs) => {
  //     let o = [...msgs];
  //     setMsg(o);
  //   };

  //   socket.on("message", getMessage);
  //   // socket.emit("message");

  //   return () => {
  //     socket.off("message", getMessage);
  //   };
  // }, [socket]);

  // useEffect(() => {

  //   const user = {
  //     id: 3,
  //   };
  //   const room = {
  //     name: "TestRoom",
  //     users: [user],
  //   };

  //   socket.emit("createRoom", room);

  //   // return () => {
  //   //   socket.off("createRoom", room);
  //   // };
  // }, [socket]);

  useEffect(() => {
    socket.on("rooms", (data) => setRooms(data));
    // console.log(data);
    return () => {
      socket.off("rooms");
    };
  }, [socket]);
  console.log("rooms", rooms);

  return (
    <div>
      {user?.username}
      <button onClick={() => clearCookies(setUser)}>logout</button>
      {rooms.map((r) => (
        <div>
          <p>
            {r?.id} , {r?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
