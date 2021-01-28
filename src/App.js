import "./App.css";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import { Router } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TodoDetail from "./pages/TodoDetail";

export default function App() {
  const [page, setPage] = React.useState("LOGIN");

  // const handleLogin = (value) => {
  //   setPage(value);
  // }

  // if (page === "LOGIN") {
  //   return <Login setPage={setPage} />;
  // }

  // if (page === "HOME") {
  //   return <Home setPage={setPage} />;
  // }

  // if (page === "PROFILE") {
  //   return <Profile setPage={setPage} />;
  // }

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/todo">TODO APP</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/todo">
          <Home />
        </Route>
        <Route path="/todo/:slug">
          <TodoDetail />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

// import React, { useState } from "react";
// import _ from "lodash";
// import CompleteTask from "./components/CompleteTask";
// import Header from "./components/Header";
// import TaskList from "./components/TaskList";
// import "antd/dist/antd.css";
// import {
//   GetTodos,
//   changeTaskCompleteState,
//   changeTaskFavoriteState,
// } from "./services/TodoService";

// import "./App.css";

// function App() {
//   const [taskLists, setTaskLists] = useState([]);

//   const [isLoadding, setLoading] = React.useState(true);

//   const [isError, setError] = React.useState(false);

//   const [reloaddingCount, setReLoaddingCount] = React.useState(0);

//   const convertDate = (time) => new Date(time).getTime();

//   React.useEffect(() => {
//     async function fetchData() {
//       try {
//         const tasks = await GetTodos();

//         // setTaskLists(tasks.data.data);

//         setTaskLists(
//           tasks.data.data.map((task) => {
//             return {
//               ...task,
//               createdDate: convertDate(task.createdDate),
//               completedDate: convertDate(task.completedDate),
//               isFavorite: task.isFavorite ? true : false,
//             };
//           })
//         );
//       } catch (ex) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [reloaddingCount]);

//   const renderErrorContent = () => {
//     return (
//       <div>
//         <div>lỗi rồi</div>
//         <button
//           onClick={() => {
//             setTaskLists([...taskLists, {}]);
//             setReLoaddingCount(reloaddingCount + 1);
//           }}
//         >
//           Tải lại
//         </button>
//       </div>
//     );
//   };

//   // const handleAddTodo = async (newTaskName) => {
//   //   try {
//   //     if (newTaskName) {
//   //       setLoading(true);
//   //       setError(false);

//   //       await addTodo(newTaskName);

//   //       setReLoaddingCount(reloaddingCount + 1);
//   //     }
//   //   } catch (ex) {
//   //     setError(true);
//   //   }
//   // };

//   // setTaskLists([
//   //   ...taskLists,
//   //   {
//   //     id: new Date().getTime(),
//   //     createdDate: new Date().getTime(),
//   //     completedDate: null,
//   //     taskName: newTaskName,
//   //     isCompleted: false,
//   //     isFavorite: false,
//   //   },
//   // ]);

//   const handleChangeCompleteStatus = async (taskId, newStatus) => {
//     try {
//       setLoading(true);
//       setError(false);

//       await changeTaskCompleteState(taskId, newStatus);

//       setReLoaddingCount(reloaddingCount + 1);
//     } catch (ex) {
//       setError(true);
//       console.log(ex.message);
//     }
//   };

//   const handleChangeFavoriteStatus = async (taskId, newStatus) => {
//     try {
//       setLoading(true);
//       setError(false);

//       await changeTaskFavoriteState(taskId, newStatus);

//       setReLoaddingCount(reloaddingCount + 1);
//     } catch (ex) {
//       setError(true);
//     }
//   };

//   const rederContent = () => {
//     return isLoadding ? (
//       "Loading..."
//     ) : (
//       <>
//         <Header
//           reloaddingCount={reloaddingCount}
//           setReLoaddingCount={setReLoaddingCount}
//         />
//         <TaskList
//           incompleteItems={inCompletedList}
//           onChangeCompleteStatus={handleChangeCompleteStatus}
//           onChangeFavoriteStatus={handleChangeFavoriteStatus}
//         />
//         <CompleteTask
//           completedItems={completedList}
//           onChangeCompleteStatus={handleChangeCompleteStatus}
//           onChangeFavoriteStatus={handleChangeFavoriteStatus}
//         />
//       </>
//     );
//   };

//   const [completedList, inCompletedList] = _.partition(
//     taskLists,
//     (t) => t.isCompleted
//   );

//   return (
//     <div className="App">{isError ? renderErrorContent() : rederContent()}</div>
//   );
// }

// export default React.memo(App);
