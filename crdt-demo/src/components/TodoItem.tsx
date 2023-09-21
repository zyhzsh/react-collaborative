import React from 'react';
import { syncEngineServer, Todo } from '../store';

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <li key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onClick={() => {
            todo.completed = !todo.completed;
          }}
        />
        {todo.title}
      </label>
      <button
        onClick={() => {
          const index = syncEngineServer.store.todos.findIndex(
            (td) => td.id === todo.id
          );
          if (index > -1) {
            syncEngineServer.store.todos.splice(index, 1);
          }
        }}
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;
