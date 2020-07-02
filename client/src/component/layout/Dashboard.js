import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  addTodo,
  getAllTodos,
  getAllActiveTodo,
  getAllCompletedTodo,
} from "../../actions/todo";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import TodoItem from "./TodoItem";
import { NavLink } from "react-router-dom";

const Dashboard = ({
  addTodo,
  getAllTodos,
  getAllActiveTodo,
  getAllCompletedTodo,
  auth: { loading, isAuthenticated },
  todo: { todos },
}) => {
  useEffect(() => {
    getAllTodos();
    getAllActiveTodo();
    getAllCompletedTodo();
  }, []);

  const [todoText, setTodo] = useState({
    todo: "",
  });

  const [getCurrentNav, setCurrentNav] = useState({
    whichOne: "",
  });

  const { todo } = todoText;

  const { whichOne } = getCurrentNav;

  const onChange = (e) => {
    setTodo({ ...todoText, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addTodo(todo, whichOne);
    console.log({ todo });
    setTodo({ ...todoText, todo: "" });
  };

  const showAllTodos = () => {
    console.log("AllTodos");

    setCurrentNav({ whichOne: "AllTodos" });
    getAllTodos();
  };

  const showActiveTodos = () => {
    console.log("ActiveTodos");
    setCurrentNav({ whichOne: "ActiveTodos" });
    getAllActiveTodo();
  };

  const showCompletedTodos = () => {
    console.log("CompletedTodos");

    setCurrentNav({ whichOne: "CompletedTodos" });
    getAllCompletedTodo();
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)} className="todo-form">
        <div className="form-group">
          <input
            type="text"
            name="todo"
            id="todo-text"
            value={todo}
            className="todo-text"
            placeholder="What needs to be done?"
            onChange={(e) => onChange(e)}
          />
          {/* <button type="submit">Submit</button> */}
        </div>
      </form>
      <div className="todo-navigation">
        <div className="todo-view-all">
          <button className="btn-view-all" onClick={showAllTodos}>
            <NavLink exact={true} activeClassName="active" to="/dashboard">
              View All
            </NavLink>
          </button>
        </div>

        <div className="todo-seperator">/</div>

        <div className="todo-active">
          <button className="btn-active" onClick={showActiveTodos}>
            <NavLink activeClassName="active" to="/dashboard?filter=active">
              Active
            </NavLink>
          </button>
        </div>

        <div className="todo-seperator">/</div>

        <div className="todo-complete">
          <button className="btn-completed" onClick={showCompletedTodos}>
            <NavLink activeClassName="active" to="/dashboard?filter=completed">
              Completed
            </NavLink>
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {todos.length > 0 ? (
            <div className="list-of-todos">
              {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} whichOne={whichOne} />
              ))}
            </div>
          ) : (
            <div className="list-of-todos">
              <h1>No Todos Available</h1>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  addTodo: PropTypes.func.isRequired,
  getAllTodos: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  todo: state.todo,
});
export default connect(mapStateToProps, {
  addTodo,
  getAllTodos,
  getAllActiveTodo,
  getAllCompletedTodo,
})(Dashboard);
