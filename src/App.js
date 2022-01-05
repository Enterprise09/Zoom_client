import React from "react";
import io from "socket.io-client";
import AppRouter from "./Components/Router";

function App() {
  const socket = io("http://localhost:3002");

  return (
    <div className="App">
      <AppRouter isLogin={false} socket={socket} />
    </div>
  );
}

export default App;
