import React from 'react';
import { NoteListItem } from './NoteListItem';
import { Flex } from '@chakra-ui/core';

export const NoteList = ({ notes }) => {
  return (
    <Flex
      direction='column'
      align='center'
      justify='start'
      width='100%'
      height='100%'
    >
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          title={note.title}
          tags={note.tags}
          date={note.created_at}
        />
      ))}
    </Flex>
  );
};
