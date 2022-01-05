import React, { useState } from "react";
import "../scss/Home.scss";
import JoinMeetingForm from "../Components/JoinMeetingForm";
import NewMeetingForm from "../Components/NewMeetingForm";

function Home({ socket }) {
  const [isNewClick, setIsNewClick] = useState(false);
  const [isJoinClick, setIsJoinClick] = useState(false);

  function onNewClick() {
    setIsNewClick(!isNewClick);
  }
  function onJoinClick() {
    setIsJoinClick(!isJoinClick);
  }
  return (
    <div className="home_container">
      <h1>Welcome back!</h1>
      <div className="categoryContainer">
        <div onClick={onNewClick}>
          <img src="img/new.png" width={60} />
          <p>New</p>
        </div>
        {isNewClick && <NewMeetingForm socket={socket} />}
        <div onClick={onJoinClick}>
          <img src="img/join.png" width={60} />
          <p>Join</p>
        </div>
        {isJoinClick && <JoinMeetingForm socket={socket} />}
      </div>
    </div>
  );
}

export default Home;
