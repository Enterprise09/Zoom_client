import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function NewMeetingForm({ socket }) {
  const [roomName, setRoomName] = useState("");
  const history = useHistory();
  if (history === undefined) {
    return null;
  }
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
    <div className="newMeetingContainer">
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
        <input type="submit" value="Make" />
      </form>
    </div>
  );
}

export default NewMeetingForm;
