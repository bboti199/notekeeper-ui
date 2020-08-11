import React, { useState } from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../../context/index';
import {
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Link,
  InputRightElement,
  Spinner,
} from '@chakra-ui/core';
import { FiUser, FiEye, FiEyeOff, FiKey } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Firebase } from '../../firebase/firebase';
import firebase from 'firebase';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('You must enter a valid email address!')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required!')
    .min(6, 'Your password must have at least 6 characters'),
});

export const Login = () => {
  const [{ user, error, loading }, dispatch] = useAuthContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch({ type: 'AUTH_START' });
    try {
      await Firebase.auth().signInWithEmailAndPassword(
        data.email,
        data.password
      );
      dispatch({ type: 'AUTH_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', payload: err.message });
    }
  };

  const googleLogin = async () => {
    dispatch({ type: 'AUTH_START' });
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await Firebase.auth().signInWithPopup(provider);
      dispatch({ type: 'AUTH_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', payload: err.message });
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <Flex
      direction='column'
      justify='start'
      align='center'
      height='100vh'
      backgroundColor='#181818'
    >
      <Flex
        backgroundColor='#fff'
        marginTop={['2rem', '2rem', '5rem', '8rem']}
        width={['100%', '80%', '450px', '550px']}
        height='700px'
        align='start'
        paddingX='2rem'
        paddingY='3rem'
        direction='column'
        justify='start'
        borderRadius='15px'
      >
        <Box marginBottom='4rem' marginTop='2rem'>
          <Text fontWeight='bold' fontSize='3xl'>
            Welcome.
          </Text>
          <Text fontSize='lg'>Please sign in to continue!</Text>
        </Box>

        <Box width='100%' marginBottom='2rem'>
          <InputGroup>
            <InputLeftAddon children={<FiUser />} />
            <Input
              placeholder='Email'
              name='email'
              type='text'
              autoFocus
              ref={register}
            />
          </InputGroup>
          <Flex width='100%' direction='column' align='center' mt='15px'>
            <Text color='red.500'>{errors.email?.message}</Text>
          </Flex>
        </Box>

        <Box width='100%' marginBottom='2rem'>
          <InputGroup>
            <InputLeftAddon children={<FiKey />} />
            <Input
              placeholder='Password'
              type={passwordVisible ? 'text' : 'password'}
              name='password'
              ref={register}
            />
            <InputRightElement
              onClick={() => setPasswordVisible(!passwordVisible)}
              children={passwordVisible ? <FiEyeOff /> : <FiEye />}
            />
          </InputGroup>
          <Flex width='100%' direction='column' align='center' mt='15px'>
            <Text color='red.500'>{errors.password?.message}</Text>
          </Flex>
        </Box>

        <Flex width='100%' flexDirection='column'>
          <Button
            type='submit'
            variantColor='blue'
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? <Spinner /> : 'LOG IN'}
          </Button>
        </Flex>
        <Flex width='100%' direction='column' align='center' mt='15px'>
          <Text textAlign='center' color='red.500'>
            {error}
          </Text>
        </Flex>

        <Flex width='100%' marginTop='1rem' align='center' direction='column'>
          <Link as={RouterLink} to='/register' color='blue.500'>
            Do not have an account? Register here
          </Link>
          <Text marginY='1.5rem'>or</Text>
          <Button width='100%' onClick={googleLogin}>
            {loading ? (
              <Spinner />
            ) : (
              <Flex
                direction='row'
                align='center'
                width='100%'
                justify='center'
              >
                <FcGoogle size='1.5rem' />
                <Text marginLeft='15px'>Sign in with Google</Text>
              </Flex>
            )}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
