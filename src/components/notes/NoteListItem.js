import React from 'react';
import { Flex, Text, Badge, TagLabel, Tag } from '@chakra-ui/core';
import moment from 'moment';
import { FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNoteContext } from '../../context';

const MotionFlex = motion.custom(Flex);

export const NoteListItem = ({ id, title, tags, date }) => {
  const [{ selectedNoteId }, dispatch] = useNoteContext();

  const setSelected = () => {
    dispatch({
      type: 'SET_SELECTED_NOTE',
      payload: {
        id,
      },
    });
  };

  return (
    <MotionFlex
      initial={{
        translateX: -500,
      }}
      animate={{
        translateX: 0,
      }}
      whileHover={{
        boxShadow: '0px 1px 10px 0px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        transition: { duration: 1 },
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={setSelected}
      width='95%'
      direction='column'
      backgroundColor={selectedNoteId === id ? 'gray.200' : 'gray.50'}
      paddingX={4}
      paddingY={6}
      border='1px solid rgba(0, 0, 0, 0.2)'
      boxShadow='0px 1px 10px 0px rgba(0,0,0,0.1)'
      my={1}
      mx={2}
      borderRadius='10px'
    >
      <Flex direction='row' align='center' justify='space-between'>
        <Text fontSize='lg' fontWeight='bold'>
          {title}
        </Text>
        <Badge variantColor='blue' fontSize='0.8rem' py={2} px={3}>
          {moment(new Date(date)).format('YYYY-MM-DD')}
        </Badge>
      </Flex>
      <Flex direction='row' align='center' wrap='wrap' mt={8}>
        {tags.map((tag) => (
          <Tag size='md' key={tag} variantColor='yellow' mr={2} mb={2}>
            <FiTag />
            <TagLabel ml={1}>{tag}</TagLabel>
          </Tag>
        ))}
      </Flex>
    </MotionFlex>
  );
};
