import {
  ADD_TODO,
  DELETE_TODO,
  CLEAR_ALL_TODO,
  EDIT_TODO,
  UPDATE_TODO,
  MARK_COMPLETED,
} from "../actions/actionTypes";

const initialState = {
  todos: [
    {
      id: 1,
      title: "TodoList 1",
      description: "This is first todo",
      isCompleted: true,
      isPending: false,
    },
    {
      id: 2,
      title: "TodoList 2",
      description: "This is second todo",
      isCompleted: false,
      isPending: true,
    },
    {
      id: 3,
      title: "TodoList 3",
      description: "This is third todo",
      isCompleted: false,
      isPending: true,
    },
  ],
  isEdit: false,
  editTodoId: "",
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const { id, title, description } = action.payload;
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: id,
            title: title,
            description: description,
            isCompleted: false,
            isPending: true,
          },
        ],
        isEdit: action.isEdit,
      };
    case DELETE_TODO:
      const newTodoList = state.todos.filter((item) => item.id !== action.id);
      return {
        ...state,
        todos: newTodoList,
      };

    case EDIT_TODO:
      const editTodo = action.payload;
      let newEditTodo = state.todos.find((item) => item.id === editTodo.id);
      return {
        ...state,
        isEdit: action.isEdit,
        editTodo: newEditTodo,
      };

    case UPDATE_TODO:
      const { todoId, todoTitle, todoDescription } = action.payload;
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: todoTitle,
            description: todoDescription,
          };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
        isEdit: false,
      };

      case MARK_COMPLETED:
  const { selectedTodoId } = action.payload;
  const updatedTodosCompleted = state.todos.map((todo) => {
    if (selectedTodoId.includes(todo.id)) {
      return {
        ...todo,
        isCompleted: true,
        isPending: false,
      };
    }
    return todo;
  });

  return {
    ...state,
    todos: updatedTodosCompleted,
  };


    case CLEAR_ALL_TODO:
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
};
export default todoReducer;
