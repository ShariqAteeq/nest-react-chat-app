import React from "react";
import { Link } from "react-router-dom";
import "./auth.css";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="outer">
        <div className="inner">
          <form>
            <h3>Log in</h3>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Sign in
            </button>
            <p className="forgot-password text-right">
              Don't have account? <Link to="/signup">Create One! </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
