import React from 'react';
import { Login, Home } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/routing/PrivateRoute';
import { useEffect } from 'react';
import { useAuthContext } from './context';
import { Firebase } from './firebase/firebase';

function App() {
  const [, dispatch] = useAuthContext();

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      dispatch({
        type: 'SET_USER',
        payload: { user },
      });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
