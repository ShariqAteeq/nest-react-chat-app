import React, { useContext } from "react";
import { ThemeContext } from "../../utils/helper";
import "./feed.css";

const UserCard = ({ user }) => {
  const { user: me } = useContext(ThemeContext);

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
      {user?.id !== me?.id && <button className="user-msg">Message</button>}
    </div>
  );
};

export default UserCard;
