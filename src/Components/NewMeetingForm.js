import React from "react";

function NewMeetingForm() {
  return (
    <div className="newMeetingContainer">
      <form>
        <input
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
