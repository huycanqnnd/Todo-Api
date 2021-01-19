import Axios from "axios";

const user = "sylk";

const apiEndpoint = "http://localhost:5000";

const getTodoEndpoint = `${apiEndpoint}/Todo/GetTodos`;

const addTodoEndpoint = `${apiEndpoint}/Todo/AddTodo`;

const postChangeCompleteEndpoint = `${apiEndpoint}/Todo/ChangeTaskCompletedState`;
const postChangeFavoriteEndpoint = `${apiEndpoint}/Todo/ChangeTaskFavoriteState`;

export const GetTodos = async () => {
  return await Axios.get(getTodoEndpoint, {
    params: {
      user: user,
    },
  });
};

export const addTodo = async (taskName) => {
  return await Axios.post(addTodoEndpoint, {
    user: user,
    taskName: taskName,
  });
};

export const markTaskCompleted = async (id) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve([{}, {}, {}]);
    }, 3000);
  });
};

export const changeTaskCompleteState = async (taskId, isCompleted) => {
  return await Axios.post(postChangeCompleteEndpoint, {
    taskId: taskId,
    isCompleted: isCompleted,
  });
};
export const changeTaskFavoriteState = async (taskId, isFavorite) => {
  return await Axios.post(postChangeFavoriteEndpoint, {
    taskId: taskId,
    isFavorite: isFavorite,
  });
};
