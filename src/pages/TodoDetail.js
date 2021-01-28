import React from "react";
import { useParams } from "react-router-dom";

export default function TodoDetail({ setPage }) {
  let { slug } = useParams();
  return (
    <div>
      <h1>Todo detail {slug}</h1>
    </div>
  );
}
