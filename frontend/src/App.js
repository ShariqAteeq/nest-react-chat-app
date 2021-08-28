import "bootstrap/dist/css/bootstrap.min.css";

import { Toaster } from "react-hot-toast";
import axios from "axios";
import Routes from "./routes";
import { ThemeContext } from "./utils/helper";

import useFindUser from "./components/hooks/useFindUser";

axios.defaults.baseURL = "http://localhost:3000/";

const App = () => {
  const { user, setUser, isLoading, setToken } = useFindUser();

  return (
    <ThemeContext.Provider value={{ user, setUser, isLoading, setToken }}>
      <Routes />
      <Toaster />
    </ThemeContext.Provider>
  );
};

export default App;
