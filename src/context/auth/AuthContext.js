import React, { createContext, useReducer, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children, initialState, reducer }) => (
  <AuthContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AuthContext.Provider>
);

export const useAuthContext = () => useContext(AuthContext);
