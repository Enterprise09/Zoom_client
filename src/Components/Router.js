import React, { useEffect, useState } from "react";
import Home from "../Routes/Home";
import Login from "../Routes/Login";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Meeting from "../Routes/Meeting";

function AppRouter({ socket, isLogin }) {
  return (
    <Router>
      <Switch>
        {isLogin ? (
          <>
            <Route path="/meeting">
              <Meeting socket={socket} />
            </Route>
            <Route path="/">
              <Home socket={socket} userObj={isLogin} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/">
              <Login />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
