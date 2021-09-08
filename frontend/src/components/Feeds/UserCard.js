import React from "react";
import "./feed.css";

const UserCard = ({ user }) => {
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
      <button className="user-msg">Message</button>
    </div>
  );
};

export default UserCard;
