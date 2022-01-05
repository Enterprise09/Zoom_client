import React from "react";
import Home from "./Home";
import Login from "./Login";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function AppRouter({ isLogin, socket }) {
  return (
    <Router>
      <Switch>
        <Route path="/">{isLogin ? <Home /> : <Login socket={socket} />}</Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
