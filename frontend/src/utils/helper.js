import { createContext } from "react";
import toast from "react-hot-toast";

const ThemeContext = createContext();

const errorResponse = (error) => {
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        toast.error(error.response.data.message);
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        toast.error(error.request);
    } else {
        // Something happened in setting up the request and triggered an Error
        toast.error('Error', error.message);
    }
}

export {
    errorResponse,
    ThemeContext
}