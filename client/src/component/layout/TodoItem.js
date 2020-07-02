import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import {
  deleteTodo,
  toggleComplete,
  updateTodo,
  // openEdit,
  // closeEdit,
} from "../../actions/todo";
import { connect } from "react-redux";

const TodoItem = ({
  todo: { _id, text, active, completed },
  deleteTodo,
  toggleComplete,
  updateTodo,
  openEdit,
  closeEdit,
  whichOne,
}) =>
  active ? (
    <Fragment>
      <div className="desktop-section">
        <div className="todo-item" id="todo-item">
          <div
            className="completed-logo"
            onClick={() => {
              toggleComplete(_id, whichOne);
            }}
          >
            <Icon name="check circle" size="big" circular fitted />
          </div>
          <div className="todo-text1">
            <p>{text}</p>
          </div>
          <div
            className="todo-edit-logo"
            id="todo-edit"
            // onClick={() => openEdit(_id, text)}
          >
            <Icon name="edit" size="big" circular fitted />
          </div>
          <div className="todo-delete" onClick={() => deleteTodo(_id)}>
            <Icon name="delete" size="big" circular fitted />
          </div>
        </div>
      </div>
      <div className="mobile-section">
        <div className="todo-item" id="todo-item">
          <div
            className="completed-logo"
            onClick={() => {
              toggleComplete(_id, whichOne);
            }}
          >
            <Icon name="check circle" size="large" circular fitted />
          </div>
          <div className="todo-text1">
            <p>{text}</p>
          </div>
          <div
            className="todo-edit-logo"
            id="todo-edit"
            // onClick={() => openEdit(_id, text)}
          >
            <Icon name="edit" size="large" circular fitted />
          </div>
          <div className="todo-delete" onClick={() => deleteTodo(_id)}>
            <Icon name="delete" size="large" circular fitted />
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="desktop-section">
        <div className="todo-item" id="todo-item">
          <div
            className="completed-logo"
            onClick={() => {
              toggleComplete(_id, whichOne);
            }}
          >
            <Icon
              name="check circle"
              size="big"
              circular
              fitted
              color="green"
            />
          </div>
          <div className="todo-text1-complete">
            <p>{text}</p>
          </div>
          <div
            className="todo-edit-logo"
            id="todo-edit"
            // onClick={() => openEdit(_id, text)}
          >
            <Icon name="edit" size="big" circular fitted />
          </div>
          <div className="todo-delete" onClick={() => deleteTodo(_id)}>
            <Icon name="delete" size="big" circular fitted />
          </div>
        </div>
      </div>
      <div className="mobile-section">
        <div className="todo-item" id="todo-item">
          <div
            className="completed-logo"
            onClick={() => {
              toggleComplete(_id, whichOne);
            }}
          >
            <Icon
              name="check circle"
              size="large"
              circular
              fitted
              color="green"
            />
          </div>
          <div className="todo-text1-complete">
            <p>{text}</p>
          </div>
          <div
            className="todo-edit-logo"
            id="todo-edit"
            // onClick={() => openEdit(_id, text)}
          >
            <Icon name="edit" size="large" circular fitted />
          </div>
          <div className="todo-delete" onClick={() => deleteTodo(_id)}>
            <Icon name="delete" size="large" circular fitted />
          </div>
        </div>
      </div>
    </Fragment>
  );

TodoItem.propTypes = {};

export default connect(null, {
  deleteTodo,
  toggleComplete,
  updateTodo,
  // openEdit,
  // closeEdit,
})(TodoItem);
