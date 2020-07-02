import {
  TODO_FAIL,
  ADD_TODO_SUCCESS,
  GET_TODOS,
  DELETE_TODOS,
  TOGGLE_COMPLETE,
  GET_ACTIVE_TODO,
  GET_COMPLETED_TODO,
  UPDATE_TODO,
} from "../actions/type";

const initialState = {
  todos: [],
  completedTodo: [],
  activeTodo: [],
  loading: true,
  todo: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case GET_TODOS:
    case GET_ACTIVE_TODO:
    case GET_COMPLETED_TODO:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case DELETE_TODOS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false,
      };
    case TOGGLE_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TODO:
      return {
        ...state,
        loading: false,
      };
    case TODO_FAIL:
      return {
        ...state,
        todo: payload,
        laoding: false,
      };
    default:
      return state;
  }
}
