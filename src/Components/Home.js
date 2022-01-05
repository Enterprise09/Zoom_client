import React, { useState } from "react";
import "../scss/Home.scss";

function Home({ socket }) {
  const [isSubmit, setIsSubmit] = useState(false);
  function onSubmit(event) {
    event.preventDefault();
    setIsSubmit(true);
  }

  return (
    <div className="home_container">
      <h1>Zoom Client</h1>
      {isSubmit ? (
        <div>
          <h1>This is call!</h1>
        </div>
      ) : (
        <form className="enterRoomForm" onSubmit={onSubmit}>
          <input
            className="roomName"
            name="roomName"
            type="text"
            required
            placeholder="Enter room"
            maxLength="15"
          />
          <input type="submit" value="Enter" />
        </form>
      )}
    </div>
  );
}

export default Home;
