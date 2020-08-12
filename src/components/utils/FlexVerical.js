import React from 'react';
import { Flex } from '@chakra-ui/core';

export const FlexVerical = ({ children }) => {
  return (
    <Flex
      height='100%'
      direction='column'
      align='center'
      justify='center'
      width='100%'
    >
      {children}
    </Flex>
  );
};
