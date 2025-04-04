import { Box, Heading, Field, Input, Button } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import axios from 'axios';
import { useState } from 'react';
import { isInvalidEmail } from '@/utils/emailValidation'; //helper function 
import { passwordMismatch } from '@/utils/pwMatcher'; //helper function
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    // react hooks
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isClickedName, setIsClickedName] = useState(false);
    const [isClickedUsername, setIsClickedUsername] = useState(false);
    const [isClickedEmail, setIsClickedEmail] = useState(false);
    const [isClickedPW, setIsClickedPW] = useState(false);
    const [isClickedConfirmPW, setIsClickedConfirmPW] = useState(false);

    const isErrorName = isClickedName && name === '';
    const isErrorUsername = isClickedUsername && username === '';
    const isErrorEmail = isClickedEmail && isInvalidEmail(email);
    const isErrorPW = isClickedPW && password === '';
    const isErrorConfirmPW = isClickedConfirmPW && passwordMismatch(password, confirmPassword)

    const handleNameChange = (event: any) => {
        // console.log('EVENT:', event)
        // console.log(event.target.value);
        setIsClickedName(true);
        setName(event.target.value);
    }

    const handleUsernameChange = (event: any) => {
        // console.log(event.target.value);
        setIsClickedUsername(true);
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        // console.log(event.target.value);
        setIsClickedEmail(true);
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        // console.log(event.target.value);
        setIsClickedPW(true);
        setPassword(event.target.value);
    };

    const handlePasswordConfirmation = (event: any) => {
        setIsClickedConfirmPW(true);
        setConfirmPassword(event.target.value);
    }
  
  const handleSubmit = async () => {
        // console.log('NAME:', name);
        // console.log('USERNAME:', username);
        // console.log('EMAIL:', email);
        // console.log('PW:', password);

        setIsClickedName(true);
        setIsClickedUsername(true);
        setIsClickedEmail(true);
        setIsClickedPW(true);
        setIsClickedConfirmPW(true);

        if (
            name === '' ||
            username === '' ||
            isInvalidEmail(email) ||
            password === '' ||
            passwordMismatch(password, confirmPassword) ||
            confirmPassword === ''
        ) {
            return; //form will not submit if any fields are in an error state, i.e., blank.
        } else {
            try {
                const response = await axios.post('http://localhost:3000/auth/sign-up', {
                    name, //the body to be sent via the request
                    username,
                    email,
                    password,
                    confirmPassword
                  })
                  console.log('RESPONSE:', response.data)

                  //save response JWT to localStorage
                  const token = response.data;
                  localStorage.setItem('token', token);
              
                  //clear out form
                  setName('')
                  setUsername('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');

                  navigate('/profile');
                  
                  toaster.create({
                    title: 'Account created.',
                    description: 'Account created successfully!',
                    duration: 3000,
                  })
                  
            } catch (error) {
                console.log('error', error)
            }
        }

    
  }
  return (
    <Box>
        <Heading textAlign='center' mb={4}>Create Your Account</Heading>
        <Box maxW='30%' display='flex' flexDirection='column' alignItems='center' m='0 auto' gap={4}>
            <Field.Root invalid={isErrorName} required>
                <Field.Label>
                    Name
                <Field.RequiredIndicator />    
                </Field.Label>
                <Input type='text'onChange={handleNameChange} value={name}/>
                {
                    !isErrorName ? null : (
                        <Field.HelperText>A name is required.</Field.HelperText> 
                    )
                }
            </Field.Root>

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

            <Field.Root invalid={isErrorEmail} required>
                <Field.Label>
                    Email
                <Field.RequiredIndicator />    
                </Field.Label>
                <Input type='email' onChange={handleEmailChange} value={email}/>
                {
                    !isErrorEmail ? null : (
                        <Field.HelperText>A valid email is required.</Field.HelperText>
                    )
                }
            </Field.Root>

            <Field.Root invalid={isErrorPW} required>
                <Field.Label>
                    Password
                <Field.RequiredIndicator />    
                </Field.Label>
                <Input type='password' onChange={handlePasswordChange} value={password}/>
                {
                    !isErrorPW ? null : (
                        <Field.HelperText>A valid password is required.</Field.HelperText>
                    )
                }
            </Field.Root>

            <Field.Root invalid={isErrorConfirmPW} required>
                <Field.Label>
                    Confirm Password
                <Field.RequiredIndicator />    
                </Field.Label>
                <Input type='password' onChange={handlePasswordConfirmation} value={confirmPassword}/>
                {
                    !isErrorConfirmPW ? null : (
                        <Field.HelperText>Passwords must match.</Field.HelperText>
                    )
                }
            </Field.Root>

            <Button w='100%' onClick={handleSubmit}>Sign Up</Button>


        </Box>
    </Box>
  )
}

export default SignUp