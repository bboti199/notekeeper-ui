import React from 'react';
import './Home.css';
import { Button } from '@chakra-ui/core';
import { Firebase } from '../../firebase/firebase';

export const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <Button
        onClick={() => {
          Firebase.auth().signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
};
