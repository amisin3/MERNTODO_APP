import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password != password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <p className="register-heading">Sign Up</p>
      <form className="register-form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            className="register-name"
            value={name}
            placeholder="Enter Your Name"
            required
            name="name"
            onChange={(e) => onChange(e)}
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            name="password2"
            className="register-password2"
            value={password2}
            placeholder="Re-enter Your Password"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="register-submit" value="Register" />
      </form>
      <p className="my-1">
        Already have an account?{" "}
        <Link className="link" to="/login">
          Sign In
        </Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
