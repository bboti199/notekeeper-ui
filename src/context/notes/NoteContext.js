import React, { createContext, useReducer, useContext } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children, initialState, reducer }) => (
  <NoteContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </NoteContext.Provider>
);

export const useNoteContext = () => useContext(NoteContext);
