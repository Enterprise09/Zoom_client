import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function JoinMeetingForm({ socket }) {
  const [roomName, setRoomName] = useState("");
  const history = useHistory();
  function onSubmit(event) {
    event.preventDefault();
    socket.emit("join_room", roomName);
    history.push("/meeting");
  }
  function onChange(event) {
    const {
      target: { value, name },
    } = event;
    if (name === "roomName") {
      setRoomName(value);
    }
  }
  return (
    <div className="JoinMeetingContainer">
      <form onSubmit={onSubmit}>
        <input
          name="roomName"
          onChange={onChange}
          value={roomName}
          type="text"
          required
          maxLength={30}
          placeholder="Enter room name"
        />
        <input type="submit" value="Join" />
      </form>
    </div>
  );
}

export default JoinMeetingForm;
