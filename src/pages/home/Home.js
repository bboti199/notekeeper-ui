import React from 'react';
import { Navbar, Sidebar, Editor } from '../../components/layout';
import { Grid } from '@chakra-ui/core';
import { NoteProvider, noteInitialState } from '../../context';

export const Home = () => {
  return (
    <NoteProvider initialState={noteInitialState}>
      <Navbar />
      <Grid templateColumns='25% 1fr' gap={5}>
        <Sidebar />
        <Editor />
      </Grid>
    </NoteProvider>
  );
};
