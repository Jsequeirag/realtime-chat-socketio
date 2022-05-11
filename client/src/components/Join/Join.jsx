import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
export default function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="Join">
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join</h1>
          <div>
            <input
              placeholder="Name"
              className="joinInput"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Room"
              className="joinInput"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={{
              pathname: "/chat",
              search: "?sort=name",
              hash: "#the-hash",
            }}
            state={{ name, room }}
          >
            <button className="button mt-20" type="submit">
              SignIn
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
