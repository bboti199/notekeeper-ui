import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';
import { AvatarDropdown } from './AvatarDropdown';

export const Navbar = () => {
  return (
    <Flex
      direction='row'
      align='center'
      justify='space-between'
      px={5}
      py={3}
      mb={10}
      boxShadow='0px 1px 10px 0px rgba(0,0,0,0.1)'
      borderBottomLeftRadius={5}
      borderBottomRightRadius={5}
    >
      <Box>
        <Text fontSize='2xl' fontWeight='bold'>
          Notes
        </Text>
      </Box>
      <AvatarDropdown />
    </Flex>
  );
};
