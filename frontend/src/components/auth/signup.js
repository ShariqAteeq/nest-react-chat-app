import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { errorResponse } from "../../utils/helper";
import { signup } from "../../utils/authservices";

const Signup = () => {
  const [loader, setLoader] = useState(false);

  const registerHandler = async (values) => {

    setLoader(true);
    const { username, email, password } = values;
    try {
      await signup(username, email, password);
      toast.success("Successfully Registered!");
      setLoader(false);
    } catch (error) {
      errorResponse(error);
      setLoader(false);
    }
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
                  <label>Full Name</label>
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
