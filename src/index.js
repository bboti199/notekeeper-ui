import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ReactQueryDevtools } from 'react-query-devtools';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core';
import { AuthProvider, authInitialState, authReducer } from './context';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider initialState={authInitialState} reducer={authReducer}>
        <CSSReset />
        <App />
        <ReactQueryDevtools initialIsOpen />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
