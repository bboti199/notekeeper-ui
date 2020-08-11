import React, { useState, useEffect } from 'react';
import {
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/core';
import { FiXCircle, FiSearch } from 'react-icons/fi';

export const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clearVisible, setClearVisible] = useState(false);

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearchBar = () => {
    setSearchTerm('');
    setClearVisible(false);
  };

  useEffect(() => {
    if (searchTerm === '' || searchTerm === null) {
      setClearVisible(false);
    }

    if (searchTerm && !clearVisible) {
      setClearVisible(true);
    }
  }, [searchTerm, clearVisible]);

  return (
    <Flex my={5} width='100%' px={5}>
      <InputGroup width='100%'>
        <InputLeftElement children={<FiSearch size={20} color='#888' />} />
        <Input
          placeholder='Search in your notes...'
          variant='filled'
          borderRadius={30}
          onChange={handleTermChange}
          value={searchTerm}
          focusBorderColor='#000'
        />
        {clearVisible ? (
          <InputRightElement
            children={<FiXCircle size={20} />}
            onClick={clearSearchBar}
          />
        ) : null}
      </InputGroup>
    </Flex>
  );
};
