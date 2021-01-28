import React, { useState } from "react";
import _ from "lodash";
import CompleteTask from "../components/CompleteTask";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import {
  GetTodos,
  changeTaskCompleteState,
  changeTaskFavoriteState,
} from "../services/TodoService";

// import "./App.css";

function Home({ setPage }) {
  const [taskLists, setTaskLists] = useState([]);

  const [isLoadding, setLoading] = React.useState(true);

  const [isError, setError] = React.useState(false);

  const [reloaddingCount, setReLoaddingCount] = React.useState(0);

  const convertDate = (time) => new Date(time).getTime();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const tasks = await GetTodos();

        // setTaskLists(tasks.data.data);

        setTaskLists(
          tasks.data.data.map((task) => {
            return {
              ...task,
              createdDate: convertDate(task.createdDate),
              completedDate: convertDate(task.completedDate),
              isFavorite: task.isFavorite ? true : false,
            };
          })
        );
      } catch (ex) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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

  // const handleAddTodo = async (newTaskName) => {
  //   try {
  //     if (newTaskName) {
  //       setLoading(true);
  //       setError(false);

  //       await addTodo(newTaskName);

  //       setReLoaddingCount(reloaddingCount + 1);
  //     }
  //   } catch (ex) {
  //     setError(true);
  //   }
  // };

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
      setLoading(true);
      setError(false);

      await changeTaskCompleteState(taskId, newStatus);

      setReLoaddingCount(reloaddingCount + 1);
    } catch (ex) {
      setError(true);
      console.log(ex.message);
    }
  };

  const handleChangeFavoriteStatus = async (taskId, newStatus) => {
    try {
      setLoading(true);
      setError(false);

      await changeTaskFavoriteState(taskId, newStatus);

      setReLoaddingCount(reloaddingCount + 1);
    } catch (ex) {
      setError(true);
    }
  };

  // const onLogout = () => {
  //   setPage(0);
  // };

  // const onProfile = () => {
  //   setPage(2);
  // };

  //   const onSubmit = () => {
  //     setIsLogin(1);
  //   };
  let history = useHistory();

  const rederContent = () => {
    return isLoadding ? (
      "Loading..."
    ) : (
      <>
        <Header
          reloaddingCount={reloaddingCount}
          setReLoaddingCount={setReLoaddingCount}
        />
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
        <button onClick={() => history.push("/")}>Logout</button>
        <button onClick={() => history.push("/profile")}>Profile</button>
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

export default React.memo(Home);
