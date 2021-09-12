import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../utils/helper";
import "./feed.css";

const UserCard = ({ user }) => {
  const { user: me, socket } = useContext(ThemeContext);

  const history = useHistory();

  const createRoom = async () => {
    const reciever = {
      id: user?.id,
    };
    const room = {
      name: user?.username,
      type: "PRIVATE",
      users: [reciever],
    };

    try {
      socket.emit("createRoom", room, function (err, responseData) {
        if (err) {
          console.log("err", err);
        } else {
          console.log("ss", responseData);
          // Event was emitted successfully
        }
      });
      history.push("/inbox");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="user-card">
      <img
        src={user?.image || "./assets/no-image.png"}
        width={150}
        height={150}
        alt=".."
        className="user-img"
      />
      <h3 className="user-title">{user?.username}</h3>
      {user?.id !== me?.id && (
        <button className="user-msg" onClick={createRoom}>
          Message
        </button>
      )}
    </div>
  );
};

export default UserCard;
