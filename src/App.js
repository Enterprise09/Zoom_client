import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import AppRouter from "./Components/Router";

function App() {
  const socket = io("http://localhost:3002");
  const isLogin = window.localStorage.getItem("auth");
  const [isAuth, setIsAuth] = useState(false);
  function authStateChange() {
    setIsAuth(!isAuth);
  }
  return (
    <div className="App">
      <AppRouter
        socket={socket}
        isLogin={isLogin}
        authStateChange={authStateChange}
      />
    </div>
  );
}

export default App;
