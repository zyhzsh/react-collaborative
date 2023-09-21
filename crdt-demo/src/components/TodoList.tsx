import React from 'react';
import { syncEngineServer } from '../store';
import { useSyncedStore } from '@syncedstore/react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useSyncedStore(syncEngineServer.store.todos);

  return (
    <ul>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
