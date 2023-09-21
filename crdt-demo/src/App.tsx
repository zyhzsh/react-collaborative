import { useEffect } from 'react';
import { syncEngineServer } from './store';
import TodoList from './components/TodoList';
import AddTodoInput from './components/AddTodoInput';
export default function App() {
  useEffect(() => {
    syncEngineServer.connect();
    return () => {
      syncEngineServer.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Add to do:</h1>
      <AddTodoInput />
      <hr />
      <TodoList />
    </div>
  );
}
