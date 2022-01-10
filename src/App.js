import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import AppRouter from "./Components/Router";
import { authService } from "./config/firebaseService";

function App() {
  const socket = io("http://localhost:3002");
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(user);
      } else {
        setIsLogin(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <div className="App">
      {init ? (
        <AppRouter socket={socket} isLogin={isLogin} />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
