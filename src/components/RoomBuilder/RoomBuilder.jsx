import React from "react";
import "./RoomBuilder.css";

function RoomBuilder() {
  return (
    <div id="book" className="roombuildhero">
      <div className="roombuildheaderContainer">
        <h1>Build A Room! </h1>
        <p>Build a room from scratch in Virtual Reality! </p>
        <a href="https://room-builder.glitch.me">
          <button className="build-btn">Build a Room</button>
        </a>
      </div>
    </div>
  );
}

export default RoomBuilder;
