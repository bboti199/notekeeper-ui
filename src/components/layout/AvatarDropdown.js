import React from 'react';
import {
  Menu,
  MenuButton,
  Flex,
  Avatar,
  MenuList,
  Text,
  MenuItem,
  Divider,
  Box,
} from '@chakra-ui/core';
import { FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuthContext } from '../../context';
import { Firebase } from '../../firebase/firebase';

export const AvatarDropdown = () => {
  const [{ user }] = useAuthContext();

  const logOut = async () => {
    await Firebase.auth().signOut();
  };

  return (
    <Menu>
      <MenuButton>
        <Flex flexDirection='row' alignItems='center' cursor='pointer' mr={2}>
          <Avatar src={user.photoURL} size='md' mr={2} />
          <FiChevronDown size={30} />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Text>
            Welcome, <b>{user.displayName}</b>!
          </Text>
        </MenuItem>
        <Divider />
        <MenuItem>
          <FiUser size={24} />
          <Box mx={2} />
          <span>Profile</span>
        </MenuItem>
        <MenuItem>
          <FiSettings size={24} />
          <Box mx={2} />
          <span>Settings</span>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logOut}>
          <FiLogOut size={24} />
          <Box mx={2} />
          <span>Log Out</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
