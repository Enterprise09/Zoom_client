import React, { useState } from "react";
import "../scss/Home.scss";
import JoinMeetingForm from "./JoinMeetingForm";
import NewMeetingForm from "./NewMeetingForm";

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
          {isNewClick && <NewMeetingForm />}
        </div>
        <div onClick={onJoinClick}>
          <img src="img/join.png" width={60} />
          <p>Join</p>
          {isJoinClick && <JoinMeetingForm />}
        </div>
      </div>
    </div>
  );
}

export default Home;
