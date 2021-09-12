import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../utils/helper";

const Home = () => {
  const { user } = useContext(ThemeContext);
  return <div>{user?.username}</div>;
};

export default Home;
