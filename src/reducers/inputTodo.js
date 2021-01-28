import { ADD_TODO } from "../actionTypes";
const todos = function (state = [], action) {
  switch (action.type) {
    case ADD_TODO: {
      state = [];
      return (state = [...state, action.payload.content]);
    }
    default:
      return state;
  }
};
export default todos;
