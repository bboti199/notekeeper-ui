import React, { Fragment } from 'react';
import {
  Flex,
  Box,
  Text,
  Divider,
  Button,
  AlertIcon,
  Alert,
  Spinner,
} from '@chakra-ui/core';
import { Searchbar } from './Searchbar';
import { FiPlus } from 'react-icons/fi';
import { useNotes } from '../../queries/noteQueries';
import { NoteList } from '../notes/NoteList';

export const Sidebar = () => {
  const { status, data, error, isFetching } = useNotes();

  return (
    <Flex
      direction='column'
      borderRightWidth={1}
      borderRightColor='#ccc'
      alignItems='flex-start'
      justifyContent='flex-start'
      height='85vh'
    >
      <Box width='100%' px={5}>
        <Text fontSize='3xl' fontWeight='medium'>
          Your Notes
        </Text>
        <Divider />
      </Box>

      {status === 'loading' || isFetching ? (
        <Flex
          height='100%'
          direction='column'
          align='center'
          justify='center'
          width='100%'
        >
          <Spinner size='lg' />
        </Flex>
      ) : status === 'error' ? (
        <Flex
          height='100%'
          direction='column'
          align='center'
          justify='center'
          width='100%'
        >
          <Text color='red.500'>{error.message}</Text>
        </Flex>
      ) : data?.length > 0 ? (
        <Fragment>
          <Searchbar />
          <NoteList notes={data} />
        </Fragment>
      ) : (
        <Flex
          height='100%'
          direction='column'
          align='center'
          justify='center'
          width='100%'
        >
          <Alert status='info'>
            <AlertIcon />
            You do not have any notes.
          </Alert>
          <Button backgroundColor='black' color='white' mt={5}>
            <FiPlus />
            <Text ml={2}>Create</Text>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
