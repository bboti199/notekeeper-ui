import React from 'react';
import { Navbar, Sidebar, Editor } from '../../components/layout';
import { Grid } from '@chakra-ui/core';
import { NoteProvider, noteInitialState, noteReducer } from '../../context';

export const Home = () => {
  return (
    <NoteProvider initialState={noteInitialState} reducer={noteReducer}>
      <Navbar />
      <Grid templateColumns='25% 1fr' gap={5}>
        <Sidebar />
        <Editor />
      </Grid>
    </NoteProvider>
  );
};
