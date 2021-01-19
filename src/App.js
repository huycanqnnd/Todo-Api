import React, { useState } from "react";
import _ from "lodash";
import CompleteTask from "./components/CompleteTask";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import {
  addTodo,
  GetTodos,
  changeTaskCompleteState,
  changeTaskFavoriteState,
} from "./services/TodoService";

import "./App.css";

function App() {
  const [taskLists, setTaskLists] = useState([]);

  const [isLoadding, setLoading] = React.useState(true);

  const [isError, setError] = React.useState(false);

  const [reloaddingCount, setReLoaddingCount] = React.useState(0);

  // const [isLoaddingTodo, setIsLoadingTodo] = React.useState(true);

  React.useEffect(async () => {
    try {
      const tasks = await GetTodos();
      setTaskLists(tasks.data.data);
    } catch (ex) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [reloaddingCount]);

  const renderErrorContent = () => {
    return (
      <div>
        <div>lỗi rồi</div>
        <button
          onClick={() => {
            setTaskLists([...taskLists, {}]);
            setReLoaddingCount(reloaddingCount + 1);
          }}
        >
          Tải lại
        </button>
      </div>
    );
  };

  const handleAddTodo = async (newTaskName) => {
    try {
      if (newTaskName) {
        await addTodo(newTaskName);
        setLoading(true);
        setError(false);
        setReLoaddingCount(reloaddingCount + 1);
      }
    } catch (ex) {
      setError(true);
    }
  };

  // setTaskLists([
  //   ...taskLists,
  //   {
  //     id: new Date().getTime(),
  //     createdDate: new Date().getTime(),
  //     completedDate: null,
  //     taskName: newTaskName,
  //     isCompleted: false,
  //     isFavorite: false,
  //   },
  // ]);

  const handleChangeCompleteStatus = async (taskId, newStatus) => {
    try {
      await changeTaskCompleteState(taskId, newStatus);
      setLoading(true);
      setError(false);
      setReLoaddingCount(reloaddingCount + 1);
    } catch (ex) {
      setError(true);
      console.log(ex.message);
    }
  };

  const handleChangeFavoriteStatus = async (taskId, newStatus) => {
    try {
      await changeTaskFavoriteState(taskId, newStatus);
      setLoading(true);
      setError(false);
      setReLoaddingCount(reloaddingCount + 1);
    } catch (ex) {
      setError(true);
    }
  };

  const rederContent = () => {
    return isLoadding ? (
      "Loading..."
    ) : (
      <>
        <Header onAddTodo={handleAddTodo} />
        <TaskList
          incompleteItems={inCompletedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        <CompleteTask
          completedItems={completedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
      </>
    );
  };

  const [completedList, inCompletedList] = _.partition(
    taskLists,
    (t) => t.isCompleted
  );

  return (
    <div className="App">{isError ? renderErrorContent() : rederContent()}</div>
  );
}

export default React.memo(App);
