import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../utils/helper";
import { clearCookies } from "../../utils/manageCookies";
import "./navbar.css";

export const NavBar = () => {
  const { setUser } = useContext(ThemeContext);

  const history = useHistory();

  return (
    <header className="navbar">
      <div className="navbar__title navbar__item">Nestjs Communication</div>
      <div className="navbar__item" onClick={() => history.push("/inbox")}>
        Inbox
      </div>
      <div className="navbar__item" onClick={() => history.push("/profile")}>
        Profile
      </div>
      <div className="navbar__item" onClick={() => history.push("/feeds")}>
        Feeds
      </div>
      <button className="navbar__item" onClick={() => clearCookies(setUser)}>
        Logout
      </button>
    </header>
  );
};
