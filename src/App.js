import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddTodo from './components/addTodo';
import TodoList from './components/todoList';
import actions from './actions/';

export const App = ({ submitTodo, todos, deleted, deleteTodo, unDelete }) => (
  <div>
    <h1>Todo list</h1>
    <AddTodo submitTodo={submitTodo} unDelete={unDelete} deleted={deleted} />
    <TodoList todos={todos} deleted={deleted} deleteTodo={deleteTodo} />
  </div>
);

App.propTypes = {
  submitTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    },
  )).isRequired,
  deleted: PropTypes.shape(
    {
      id: PropTypes.number,
      text: PropTypes.string,
    },
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  unDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.todoListApp;

const mapDispatchToProps = dispatch => ({
  submitTodo: (text) => {
    if (text) {
      dispatch(actions.submitTodo(text));
    }
  },

  deleteTodo: (id) => {
    dispatch(actions.deleteTodo(id));
  },

  unDelete: () => {
    dispatch(actions.unDelete());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
