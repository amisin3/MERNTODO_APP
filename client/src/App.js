import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Landing from "./component/Landing";
import "./App.css";

// Redux
import store from "./store";
import { Provider } from "react-redux";
import Alert from "./component/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./component/layout/Dashboard";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="container">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="notification-part" id="notification-part">
              <Alert />
            </div>
            <div className="center-part">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route
                  exact
                  path="/dashboard?filter=active"
                  component={Dashboard}
                />
                <Route
                  exact
                  path="/dashboard?filter=completed"
                  component={Dashboard}
                />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
