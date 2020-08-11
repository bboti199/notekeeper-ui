import React from 'react';
import './Home.css';
import { Button, Image } from '@chakra-ui/core';
import { Firebase } from '../../firebase/firebase';
import { useAuthContext } from '../../context';

export const Home = () => {
  const [{ user }] = useAuthContext();
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
      <Image src={user.photoURL} />
    </div>
  );
};
