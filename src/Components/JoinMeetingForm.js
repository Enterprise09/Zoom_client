import React from "react";

function JoinMeetingForm() {
  return (
    <div className="JoinMeetingContainer">
      <form>
        <input
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
