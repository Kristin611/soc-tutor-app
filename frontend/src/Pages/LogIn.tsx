import ForgotPWModal from '@/Components-R/Login/ForgotPWModal';
import { Context } from '../App';
import { toaster } from '@/components/ui/toaster';
import { Box, Button, Field, Heading, Input, Text} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();
  const context = useOutletContext() as Context;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isClickedUsername, setIsClickedUsername] = useState(false);
  const [isClickedPW, setIsClickedPw] = useState(false);

  const isErrorUsername = isClickedUsername && username === '';
  const isErrorPW = isClickedPW && password === '';


  const handleUsernameChange = (e: any) => {
    setIsClickedUsername(true);
    setUsername(e.target.value);
  };

  const handlePWChange = (e: any) => {
    setIsClickedPw(true);
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    
    //to check our onChange functions & onSubmit function
    //console.log('USERNAME:', username);
    //console.log('PASSWORD:', password);

    setIsClickedUsername(true);
    setIsClickedPw(true);

    if (
      username === '' ||
      password === ''
    ) {
      return; //form will not submit if username or password are blank.
    } else {
      try {
        const response = await axios.post('http://localhost:3000/auth/log-in', {
          username,
          password
        })
        //console.log('RESPONSE:', response.data);

        const token = response.data;
        context.toggleLoggedIn();
        localStorage.setItem('token', token);

        //clear out form
        setUsername('');
        setPassword('');

        navigate('/dashboard');

        toaster.create({
          title: 'Login successful.',
          description: `Welcome back ${username}!`,
          duration: 3000,
        })
      } catch (error) {
        console.log('ERROR', error)

        setUsername('');
        setPassword('');

        //console.log('error', error);

        toaster.create({
          title: 'Error',
          description: 'There was an error logging you into your account. Please try again.',
          duration: 3000,
        })
        
      }
    }
  }

  return (
       <Box>
            <Heading textAlign='center' mb={4}>Log into Your Account</Heading>
            <Box maxW='30%' display='flex' flexDirection='column' alignItems='center' m='0 auto' gap={4}>
    
                <Field.Root invalid={isErrorUsername} required>
                    <Field.Label>
                        Username
                    <Field.RequiredIndicator />    
                    </Field.Label>
                    <Input type='text' onChange={handleUsernameChange} value={username}/>
                    {
                        !isErrorUsername ? null : (
                            <Field.HelperText>A username is required.</Field.HelperText>
                        )
                    }
                </Field.Root>
    
                <Field.Root invalid={isErrorPW} required>
                    <Field.Label>
                        Password
                    <Field.RequiredIndicator />    
                    </Field.Label>
                    <Input type='password' onChange={handlePWChange} value={password}/>
                    {
                        !isErrorPW ? null : (
                            <Field.HelperText>A valid password is required.</Field.HelperText>
                        )
                    }
                </Field.Root>
    
                <Button w='100%' onClick={handleSubmit}>Log in</Button>
    
    
            </Box>
            <Box display='flex'  gap={10} justifyContent='center' mt={10}>
              <Text lineHeight='40px'>Forgot your password?</Text>
              <ForgotPWModal />           
            </Box>
        </Box>
        
  )
}

export default LogIn