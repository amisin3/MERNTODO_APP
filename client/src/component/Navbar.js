import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Icon } from "semantic-ui-react";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const guestLinks = (
    <Fragment>
      <div className="desktop-section">
        <div className="left-heading-part ">
          <div className="first-section">
            <h4>Todo MERN</h4>
          </div>
          <div className="second-section">
            <Link to="#!" className="link">
              <Icon name="github" size="big" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mobile-section">
        <div className="left-heading-part">
          <div className="first-section">
            <h1>Todo MERN</h1>
          </div>
          <div className="second-section">
            <Link to="#!" className="link">
              <Icon name="github" size="big" />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <div className="desktop-section">
        <div className="left-heading-part">
          <div className="first-section">
            <h4>Todo MERN</h4>
          </div>
          <div className="second-section">
            <div className="logout-section">
              <Link onClick={logout} to="/login" className="logout">
                <h4>Sign Out</h4>
              </Link>
            </div>
            <div>
              <Link to="#!" className="link">
                <Icon name="github" size="big" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-section">
        <div className="left-heading-part">
          <div className="first-section">
            <h2>Todo MERN</h2>
          </div>
          <div className="second-section">
            <div className="logout-section">
              <Link onClick={logout} to="/login" className="logout">
                <h2>Sign Out</h2>
              </Link>
            </div>
            <div>
              <Link to="#!" className="link">
                <Icon name="github" size="big" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
