import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/utility";
import { PATH } from "./../config/routes";
import Login from "./auth/Login";
import Post from "./post";
import AppUsers from "./users";
import Comments from "./comments";
import { ThemeProvider } from "@material-ui/core";
import "../assets/css/dev.css";
import theme from "../theme";

/**
 * Authenticated routes middleware
 * @param {*} Component
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={PATH.ADMINLOGIN} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.object,
};

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <React.StrictMode>
          <BrowserRouter>
            <React.Fragment>
              <ThemeProvider theme={theme}>
                <Switch>
                  <Route path={PATH.ADMINLOGIN} exact component={Login} />
                  <PrivateRoute
                    path={PATH.APPUSERS}
                    exact
                    component={AppUsers}
                  />
                  <PrivateRoute
                    path={PATH.COMMENTS}
                    exact
                    component={Comments}
                  />
                  <PrivateRoute path={PATH.POST} exact component={Post} />
                </Switch>
              </ThemeProvider>
            </React.Fragment>
          </BrowserRouter>
        </React.StrictMode>
      </React.Fragment>
    );
  }
}

export default App;
