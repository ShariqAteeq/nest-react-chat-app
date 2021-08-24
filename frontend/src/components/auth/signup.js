import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { Form, Formik } from "formik";
import { signup } from "../../utils/authservices";
import axios from "axios";

const Signup = () => {
  const [loader, setLoader] = useState(false);

  const registerHandler = (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // try {
    setLoader(true);
    const { username, email, password } = values;
    //   console.log("vl", values);
    //   let data = await signup(username, email, password);
    //   console.log("data", data);
    //   setLoader(false);
    // } catch (error) {
    //   console.log("Err", error)
    // }
    axios
      .post("/api/user", { username, email, password }, config)
      .catch((err) => console.log("E", err));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { username, email, password },
    };
    fetch("/api/user", requestOptions)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    setLoader(false);
  };

  return (
    <div className="auth-container">
      <div className="outer">
        <div className="inner">
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={registerHandler}
          >
            {({ handleSubmit, handleChange }) => (
              <Form>
                <h3>Register</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  className="btn btn-dark btn-lg btn-block"
                  disabled={loader}
                >
                  {loader ? "Loading..." : "Register"}
                </button>
                <p className="forgot-password text-right">
                  Already registered <Link to="/signin">log in?</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
