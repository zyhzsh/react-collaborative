import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { syncEngineServer } from '../store';
import { useSyncedStore } from '@syncedstore/react';

const AddTodoInput = () => {
  const { todos, inputValue } = useSyncedStore(syncEngineServer.store);

  const handleAddNewTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      // Add a todo item using the text added in the textfield
      todos.push({
        id: uuidv4(),
        completed: false,
        title: target.value,
      });
      // Reset the input's value in the store
      inputValue.value = '';
    }
  };

  return (
    <input
      placeholder="Hit Enter to add to do"
      type="text"
      value={inputValue.value ? inputValue.value : ''}
      onChange={(e) => (inputValue.value = e.target.value)}
      onKeyUp={handleAddNewTodo}
      style={{
        width: '500px',
        height: '50px',
        fontSize: '18px',
        maxWidth: '100%',
      }}
    />
  );
};

export default AddTodoInput;
