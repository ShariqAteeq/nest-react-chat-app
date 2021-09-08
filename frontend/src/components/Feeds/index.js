import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { errorResponse, ThemeContext } from "../../utils/helper";
import UserCard from "./UserCard";

const Feeds = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(ThemeContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoader(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const { data } = await axios.get("/api/user/all_user", config);
        setUsers(data["items"]);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        errorResponse(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="chat-container">
      <h2 className="heading-feed">Chat with people</h2>
      <div className="user-container">
        {loader ? (
          <h3>Loading...</h3>
        ) : (
          users?.map((user) => <UserCard user={user} />)
        )}
      </div>
    </div>
  );
};

export default Feeds;
