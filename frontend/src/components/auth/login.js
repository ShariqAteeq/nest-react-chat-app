import { Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import { signin } from "../../utils/authservices";
import { errorResponse } from "../../utils/helper";
import { setCookies } from "../../utils/manageCookies";
import "./auth.css";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const history = useHistory();


  const signInHandler = async (values) => {
    setLoader(true);
    const { email, password } = values;
    try {
      const { data } = await signin(email, password);
      const { access_token } = data;
      setCookies(access_token);
      toast.success("Login Successfully!");
      setLoader(false);
      window.location.reload();
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
            initialValues={{ email: "", password: "" }}
            onSubmit={signInHandler}
          >
            {({ handleChange, handleSubmit }) => (
              <Form>
                <h3>Log in</h3>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-dark btn-lg btn-block"
                  disabled={loader}
                >
                  {loader ? "Loading..." : "Sign in"}
                </button>
                <p className="forgot-password text-right">
                  Don't have account? <Link to="/signup">Create One! </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
