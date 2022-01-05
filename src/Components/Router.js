import React, { useEffect, useState } from "react";
import Home from "../Routes/Home";
import Login from "../Routes/Login";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Meeting from "../Routes/Meeting";

function AppRouter({ isLogin, socket }) {
  const [isAuth, setIsAuth] = useState(isLogin);
  useEffect(() => {
    if (window.localStorage.getItem("id")) {
      setIsAuth(!isAuth);
    }
  }, window.localStorage.getItem("id"));
  return (
    <Router>
      <Switch>
        <Route path="/meeting">
          <Meeting socket={socket} />
        </Route>
        <Route path="/">
          {isAuth ? <Home socket={socket} /> : <Login socket={socket} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
