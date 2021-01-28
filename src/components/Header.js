import React, { useState } from "react";
import classes from "./Header.module.css";
import { addTodo } from "../services/TodoService";

function Header({ reloaddingCount, setReLoaddingCount }) {
  const [isLoadding, setLoading] = React.useState(false);

  const [isError, setError] = React.useState(false);

  const [currentItem, setCurrentItem] = useState("");

  const handleChange = (value) => {
    setCurrentItem(value);
  };

  const handleAddTodo = async (newTaskName) => {
    try {
      if (newTaskName) {
        setLoading(true);

        setError(false);

        await addTodo(newTaskName);

        setReLoaddingCount(reloaddingCount + 1);
      }
    } catch (ex) {
      setError(true);
    }
  };

  const handeKeyDown = (event) => {
    if (event.keyCode === 13 && currentItem) {
      handleAddTodo(currentItem);
      setCurrentItem("");
    }
  };

  // const onTodoAdded = () => {
  //   setLoading(true);
  // }

  return (
    <header className={classes.heading}>
      <h1>Tasks</h1>
      <input
        type="text"
        value={currentItem}
        placeholder="Add a task"
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(event) => handeKeyDown(event)}
      />
    </header>
  );
}

export default Header;
