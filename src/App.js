import React from 'react';
import { Login } from './pages';
import { useAuthContext } from './context';

function App() {
  const [state] = useAuthContext();

  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
