import React, { useContext } from "react";
import { useState, createContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "./helper";

function JoinPage() {
  const { username, setUsername, room, setRoom, socket } =
    useContext(UserContext);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const joinRoom = () => {
    socket.emit("join_room", { username, room }, (response) => {
      if (response.status === "KO") {
        setMessage(response.error);
      }
      if (response.status === "OK") {
        setMessage("User joined.");
        navigate(`/chat?room=${room}`);
      }
    });
  };

  return (
    <div className="joinChatContainer">
      <h3> Chat App 1.0 </h3>
      <input
        type="text"
        placeholder="FunkyPotato123..."
        onChange={(event) => {
          setMessage("");
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="room_id..."
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setMessage("");
            setRoom(event.target.value);
            joinRoom();
          }
        }}
        onChange={(event) => {
          setMessage("");
          setRoom(event.target.value);
        }}
      />

      <button onClick={joinRoom}>Start chatting!</button>

      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default JoinPage;
