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
import { FiUser, FiEye, FiEyeOff, FiKey, FiAtSign } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Firebase } from '../../firebase/firebase';
import firebase from 'firebase';
import { motion } from 'framer-motion';

const MotionFlex = motion.custom(Flex);

const schema = yup.object().shape({
  email: yup
    .string()
    .email('You must enter a valid email address!')
    .required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required!')
    .min(6, 'Your password must have at least 6 characters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const Register = () => {
  const [{ user, error, loading }, dispatch] = useAuthContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const user = await Firebase.auth().createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      await Firebase.auth().currentUser.updateProfile({
        displayName: data.username,
        photoURL: `https://api.adorable.io/avatars/285/${user.user.uid}.png`,
      });
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
      justify='center'
      align='center'
      height='100vh'
      backgroundColor='#181818'
      backgroundImage={`url(${require('../../assets/bg.jpg')})`}
    >
      <MotionFlex
        initial={{
          opacity: 0,
          translateX: -1000,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          type: 'spring',
          stiffness: 80,
        }}
        backgroundColor='#fff'
        width={['100%', '80%', '450px', '600px']}
        align='start'
        paddingX='2rem'
        paddingY='3rem'
        direction='column'
        justify='start'
        borderRadius='15px'
      >
        <Box marginBottom='4rem' marginTop='2rem'>
          <Text fontWeight='bold' fontSize='3xl'>
            Hey there.
          </Text>
          <Text fontSize='lg'>Let's get started by signing up!</Text>
        </Box>

        <Box width='100%' marginBottom='2rem'>
          <InputGroup>
            <InputLeftAddon children={<FiAtSign />} />
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
            <InputLeftAddon children={<FiUser />} />
            <Input
              placeholder='Username'
              name='username'
              type='text'
              ref={register}
            />
          </InputGroup>
          <Flex width='100%' direction='column' align='center' mt='15px'>
            <Text color='red.500'>{errors.username?.message}</Text>
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

        <Box width='100%' marginBottom='2rem'>
          <InputGroup>
            <InputLeftAddon children={<FiKey />} />
            <Input
              placeholder='Confirm your password'
              type={passwordConfirmVisible ? 'text' : 'password'}
              name='passwordConfirm'
              ref={register}
            />
            <InputRightElement
              onClick={() => setPasswordConfirmVisible(!passwordConfirmVisible)}
              children={passwordConfirmVisible ? <FiEyeOff /> : <FiEye />}
            />
          </InputGroup>
          <Flex width='100%' direction='column' align='center' mt='15px'>
            <Text color='red.500'>{errors.passwordConfirm?.message}</Text>
          </Flex>
        </Box>

        <Flex width='100%' flexDirection='column'>
          <Button
            type='submit'
            variantColor='blue'
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? <Spinner /> : 'REGISTER'}
          </Button>
        </Flex>
        <Flex width='100%' direction='column' align='center' mt='15px'>
          <Text textAlign='center' color='red.500'>
            {error}
          </Text>
        </Flex>

        <Flex width='100%' marginTop='1rem' align='center' direction='column'>
          <Link as={RouterLink} to='/login' color='blue.500'>
            Already registered? Log in here!
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
      </MotionFlex>
    </Flex>
  );
};
