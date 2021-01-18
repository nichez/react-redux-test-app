import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Auth = React.lazy(() => {
  return import("./containers/Auth");
});

const Dashboard = React.lazy(() => {
  return import("./containers/Dashboard");
});

const Settings = React.lazy(() => {
  return import("./containers/Settings");
});

const App: React.FC<any> = (props) => {
  const classes = useStyles();
  const { isAuthenticated } = props;
  
  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />}></Route>
      <Redirect exact from="/" to="/auth" />
      <Redirect to="/auth" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
        <Route path="/settings" render={(props) => <Settings {...props} />} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      {isAuthenticated && <Header />}
      {isAuthenticated && <Sidebar />}
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: localStorage.getItem("token") !== null,
  };
};

export default withRouter(connect(mapStateToProps, null)(App));
