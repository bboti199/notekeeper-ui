import React from 'react';
import { Flex, Text, Badge, TagLabel, Tag } from '@chakra-ui/core';
import moment from 'moment';
import { FiTag } from 'react-icons/fi';

export const NoteListItem = ({ title, tags, date }) => {
  return (
    <Flex
      width='95%'
      direction='column'
      backgroundColor='gray.50'
      paddingX={4}
      paddingY={6}
      border='1px solid rgba(0, 0, 0, 0.1)'
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
    </Flex>
  );
};
