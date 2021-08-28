import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../utils/helper";
import { clearCookies } from "../../utils/manageCookies";

const Home = () => {
  const { user, setUser } = useContext(ThemeContext);

  const history = useHistory();

  return (
    <div>
      {user?.username}
      <button onClick={() => clearCookies(setUser)}>logout</button>
    </div>
  );
};

export default Home;
