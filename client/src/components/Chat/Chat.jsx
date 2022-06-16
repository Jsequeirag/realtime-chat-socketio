//libraries
import { useState, useEffect, React } from "react";
//import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
//components
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Join from "../Join/Join";
//css
import "./Chat.css";
const ENDPOINT = process.env.REACT_APP_SERVER || "localhost:3000";
var socket;
export default function Chat() {
  let location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const { name, room } = location.state;
    socket = io(ENDPOINT, { transports: ["websocket"] });

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        setError(error);
        alert(error);
      } else {
        setError("pass");
      }
    });
  }, [location.state]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return error === "pass" ? (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  ) : (
    <Join />
  );
}
