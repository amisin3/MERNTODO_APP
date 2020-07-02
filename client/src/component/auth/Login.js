import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    console.log("Hi i am here");

    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <p className="register-heading">Sign In</p>
      <form className="register-form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="register-email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="register-password"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="register-submit" value="Login" />
      </form>
      <p className="my-1">
        Already have an account?{" "}
        <Link className="link" to="/register">
          Sign Up
        </Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
