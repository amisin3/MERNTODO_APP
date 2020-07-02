import {
  ADD_TODO_SUCCESS,
  TODO_FAIL,
  GET_TODOS,
  DELETE_TODOS,
  TOGGLE_COMPLETE,
  GET_ACTIVE_TODO,
  GET_COMPLETED_TODO,
  UPDATE_TODO,
} from "./type";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import todo from "../reducers/todo";

export const addTodo = (todo, whichOne) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ text: todo });

    const res = await axios.post("/api/todo/add", body, config);

    if (whichOne !== "CompletedTodos") {
      dispatch({
        type: ADD_TODO_SUCCESS,
        payload: res.data,
      });
    }

    dispatch(setAlert("Todos Created", "success"));
  } catch (err) {
    dispatch({
      type: TODO_FAIL,
      payload: { msg: err.response.data.errors },
    });
  }
};

export const getAllTodos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/todo");

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_FAIL,
    });
  }
};

export const deleteTodo = (todoId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/todo/delete/${todoId}`);

    dispatch({
      type: DELETE_TODOS,
      payload: todoId,
    });
  } catch (err) {
    dispatch({
      type: TODO_FAIL,
    });
  }
};

export const toggleComplete = (todoId, whichOne) => async (dispatch) => {
  try {
    const res = await axios.put(`api/todo/updatecompleted/${todoId}`);

    dispatch({
      type: TOGGLE_COMPLETE,
      payload: todoId,
    });

    console.log({ whichOne });

    if (whichOne === "AllTodos") {
      dispatch(getAllTodos());
    } else if (whichOne === "ActiveTodos") {
      dispatch(getAllActiveTodo());
    } else {
      dispatch(getAllCompletedTodo());
    }

    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    dispatch({
      type: TODO_FAIL,
    });
  }
};

export const getAllActiveTodo = () => async (dispatch) => {
  try {
    const res = await axios.get("api/todo/active");

    dispatch({
      type: GET_ACTIVE_TODO,
      payload: res.data,
    });

    // dispatch(getAllTodos());
  } catch (err) {
    dispatch({
      type: TODO_FAIL,
    });
  }
};

export const getAllCompletedTodo = () => async (dispatch) => {
  try {
    const res = await axios.get("api/todo/completed");

    dispatch({
      type: GET_COMPLETED_TODO,
      payload: res.data,
    });

    // dispatch(getAllTodos());
  } catch (err) {
    dispatch({
      type: TODO_FAIL,
    });
  }
};

export const updateTodo = (todoId, text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ text });

    const res = await axios.put(`api/todo/update/${todoId}`, body, config);

    dispatch({
      type: UPDATE_TODO,
    });

    dispatch(getAllTodos());
    dispatch(setAlert("Todos Updated", "success"));
  } catch (err) {
    dispatch({
      type: TODO_FAIL,
    });
  }
};

// export const openEdit = (todoId, text) => async (dispatch) => {
//   const todoItem = document.getElementById("todo-item");
//   console.log(todoItem);
//   var editBox =
//     "<div className='edit-box'><input type='text' classname='todo-text'/></div><div className='edit-cancel' onClick={() => {cancelEdit(_id, whichOne);}}><Icon name='remove circle' size='big' circular fitted /></div>";

//   var edited = "<h1>Hello World</h1>";
//   todoItem.removeChild();
//   todoItem.appendChild(edited);
// };

// export const closeEdit = (todoId, text) => async (dispatch) => {
//   const todoItem = document.getElementById("todo-edit");

//   const todoBox = '<Icon name="edit" size="big" circular fitted />';

//   todoItem.appendChild(todoBox);
// };
