import Chat from "./components/Chat";
import JoinPage from "./components/JoinPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/helper";
import { useState } from "react";
import io from "socket.io-client";
import ErrorPage from "./components/ErrorPage";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [userSelectedImage, setUserSelectedImage] = useState([null]);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          username,
          setUsername,
          room,
          setRoom,
          socket,
          selectedImage,
          setSelectedImage,
          userSelectedImage,
          setUserSelectedImage,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<JoinPage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<ErrorPage />} />
            {/* <Route path="/chat?room=*" element={<ErrorPage />} /> */}
            {/* if the user is trying to access a room that doesn't exist, the error page should be displayed*/}
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
