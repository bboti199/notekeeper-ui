import React from 'react';
import { Login, Home, Register } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/routing/PrivateRoute';
import { useEffect } from 'react';
import { useAuthContext } from './context';
import { Firebase } from './firebase/firebase';
import { Flex, Spinner } from '@chakra-ui/core';

function App() {
  const [{ initialLoading }, dispatch] = useAuthContext();

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      dispatch({
        type: 'SET_USER',
        payload: { user },
      });
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (initialLoading) {
    return (
      <Flex
        height='100vh'
        width='100%'
        direction='column'
        align='center'
        justify='center'
      >
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
