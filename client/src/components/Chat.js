import React, { useState, useEffect, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import EmojiPicker from "emoji-picker-react";
import { UserContext } from "./helper";
import { useNavigate } from "react-router-dom";
import ChangeImageWindow from "./ChangeImageWindow";
import InputEmoji from "react-input-emoji";
import ReactEmoji from "react-input-emoji";
import Tooltip from "@mui/material/Tooltip";
import {
  BoxArrowRight,
  FileImage,
  EmojiSmile,
  Send,
  CardImage,
} from "react-bootstrap-icons";
import { display } from "@mui/system";

function Chat() {
  const {
    username,
    setUsername,
    room,
    setRoom,
    socket,
    selectedImage,
    setSelectedImage,
    userSelectedImage,
    setUserSelectedImage,
  } = useContext(UserContext);

  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);
  const [emoji, setEmoji] = useState(false); // displays the emoji list
  // const [selectedEmoji, setSelectedEmoji] = useState("");

  const [changeImage, setChangeImage] = useState(false);

  const navigate = useNavigate();

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setListMessages((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const leaveChat = () => {
    socket.emit("leave", { username: username, room: room });
    navigate("/");
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCurrentMessage(currentMessage + emoji);
  };

  // call the function bellow whenever there is a change in on the socket server, in order to listen for messages from another user
  useEffect(() => {
    socket.removeAllListeners();
    socket.on("receive_message", (data) => {
      setListMessages((list) => [...list, data]);
    });
  }, [socket.id]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat </p>
        <div className="buttons">
          <Tooltip title="Leave the chat">
            <button style={{ right: 0 }} onClick={leaveChat}>
              <BoxArrowRight style={{ width: "50%" }} className="icon" />
            </button>
          </Tooltip>
          {/* select an image */}
          <Tooltip title="Change the chat image">
            <button
              style={{ left: 0 }}
              onClick={() => {
                setChangeImage(!changeImage);
              }}
            >
              <CardImage style={{ width: "50%" }} className="icon" />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="chat-body" id="body">
        <ScrollToBottom className="message-container">
          {changeImage && <ChangeImageWindow className="icon" />}

          {listMessages.map((messageContent, index) => {
            var messageId = "";
            if (username === messageContent.author) {
              messageId = "you";
            } else if (messageContent.author === "admin") {
              messageId = "admin";
            } else {
              messageId = "other";
            }

            let displayOptions = false;
            return (
              <div className="message" id={messageId} key={index}>
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">
                      {messageId === "you" ? "" : messageContent.author}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {emoji && (
            <div className="emoji-picker">
              <EmojiPicker
                previewConfig={{ showPreview: false }}
                searchDisabled="true"
                width="100%"
                height="300px"
                onEmojiClick={addEmoji}
              />
            </div>
          )}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <button
          onClick={() => {
            emoji === true ? setEmoji(false) : setEmoji(true);
          }}
        >
          <EmojiSmile className="icon" />
        </button>

        <input
          type="text"
          value={currentMessage}
          placeholder="Hello ..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
            setChangeImage(false);
            setEmoji(false);
          }}
          onClick={() => {
            setChangeImage(false);
            setEmoji(false);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        ></input>

        {/* <InputEmoji
          value={currentMessage}
          onChange={setCurrentMessage}
          cleanOnEnter
          onEnter={sendMessage}
          placeholder="Type a message"
        /> */}

        <button onClick={sendMessage}>
          <Send className="icon" />
        </button>
      </div>
    </div>
  );
}

export default Chat;
