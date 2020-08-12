import React, { Fragment, useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { useNotes } from '../../queries/noteQueries';
import {
  Flex,
  Text,
  Tooltip,
  AlertIcon,
  Alert,
  Spinner,
  IconButton,
} from '@chakra-ui/core';

import { Searchbar } from './Searchbar';
import { FlexVerical } from '../utils/FlexVerical';
import { NoteList } from '../notes/NoteList';

export const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { status, data, error, isFetching } = useNotes();
  const debounceFilter = useCallback(
    debounce((notes, term) => {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(term) ||
          note.tags.some((tag) => tag.toLowerCase().includes(term))
      );
      return setFilteredNotes(filtered);
    }, 500),
    []
  );

  useMemo(() => {
    if (data?.length > 0 && searchTerm) {
      debounceFilter(data, searchTerm);
    } else {
      setFilteredNotes(data);
    }
  }, [searchTerm, data, debounceFilter]);

  return (
    <Flex
      direction='column'
      borderRightWidth={1}
      borderRightColor='#ccc'
      alignItems='flex-start'
      justifyContent='flex-start'
      height='85vh'
    >
      <Flex
        width='100%'
        px={5}
        direction='row'
        align='center'
        justify='space-between'
      >
        <Text fontSize='3xl' fontWeight='medium'>
          Your Notes
        </Text>
        <Tooltip
          hasArrow
          label='Create note'
          placement='right'
          color='#000'
          bg='white'
        >
          <IconButton variantColor='blue' icon='add' />
        </Tooltip>
      </Flex>

      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {status === 'loading' || isFetching ? (
        <FlexVerical>
          <Spinner size='lg' />
        </FlexVerical>
      ) : status === 'error' ? (
        <FlexVerical>
          <Text color='red.500'>{error.message}</Text>
        </FlexVerical>
      ) : filteredNotes?.length > 0 ? (
        <Fragment>
          <NoteList notes={filteredNotes} />
        </Fragment>
      ) : (
        <FlexVerical>
          <Alert status='info'>
            <AlertIcon />
            We did not find anyting.
          </Alert>
        </FlexVerical>
      )}
    </Flex>
  );
};
