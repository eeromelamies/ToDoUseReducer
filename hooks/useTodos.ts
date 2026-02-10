import { useReducer } from 'react';


export interface Todo { 
  id: number; 
  name: string; 
  done: boolean;
}

interface State {
  todos: Todo[];
  inputValue: string;
}

type Action = 
  | { type: 'inputValue'; payload: string }
  | { type: 'add' }
  | { type: 'toggle'; payload: number };

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inputValue':
      return { ...state, inputValue: action.payload };

    case 'add':
      if (state.inputValue.trim() === '') return state;
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), name: state.inputValue, done: false }
        ],
        inputValue: ''
      };

    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        )
      };

    default:
      return state;
  }
}

export function useTodos(initialTodos: Todo[] = []) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: initialTodos,
    inputValue: ''
  });

  return { state, dispatch };
}


   