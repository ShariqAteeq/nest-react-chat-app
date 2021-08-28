import "bootstrap/dist/css/bootstrap.min.css";

import { Toaster } from "react-hot-toast";
import axios from "axios";
import Routes from "./routes";

axios.defaults.baseURL = "http://localhost:3000/";

function App() {
  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

export default App;
