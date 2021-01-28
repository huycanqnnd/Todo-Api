import React from "react";
import { useHistory } from "react-router-dom";

export default function Profile({ setPage }) {
  let history = useHistory();
  return (
    <div>
      <button onClick={() => history.push("/")}>Logout</button>
      <button onClick={() => history.push("/todo")}>Home</button>
    </div>
  );
}
