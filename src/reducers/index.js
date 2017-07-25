import types from '../constants/';

export const initialState = {
  todos: [],
  deleted: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
          },
        ],
      };

    case types.DELETE_TODO:
      return {
        todos: [
          ...state.todos.filter(todo => (
            todo.id !== action.id
          )),
        ],
        deleted: state.todos.filter(todo => (
          todo.id === action.id
        ))[0],
      };

    case types.UNDELETE: {
      const deletedTodo = Object.assign({}, state.deleted);

      return {
        todos: [
          ...state.todos.filter(todo => (
            todo.id < deletedTodo.id
          )),
          deletedTodo,
          ...state.todos.filter(todo => (
            todo.id > deletedTodo.id
          )),
        ],
        deleted: {},
      };
    }

    default:
      return state;
  }
};

export default reducer;
