import { toaster } from "@/components/ui/toaster";
import { Box, Button, Field, Heading, Input } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"


const ResetPW = () => {
    //const params = useParams();
    const {id, token} = useParams(); //deconstructed const params to const {id, token}
    //console.log('ID', id);
    //console.log('TOKEN', token)

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [secondPW, setSecondPW] = useState('');

    //to prevent the form from auto-generating error message that a valid password is required
    const [submitPW, setSubmitPW] = useState(false);
    const [submitSecondPW, setSubmitSecondPW] = useState(false);

    const isErrorPW = password === '' && submitPW;
    const isErrorSecondPW = password !== secondPW && submitSecondPW;

    const handlePWChange = (e: any) => {
        setSubmitPW(false);
        setSubmitSecondPW(false);
        setPassword(e.target.value);
    };

    const handleSecondPWChange = (e: any) => {
        setSubmitSecondPW(false);
        setSecondPW(e.target.value);
    };

    const handleSubmit = async () => {
        console.log('PASSWORD', password);
        console.log('SECOND PASSWORD', secondPW);

        setSubmitPW(true);
        setSubmitSecondPW(true);

        try {
            const response = await axios.post('http://localhost:3000/auth/save-new-password', {
                newPassword: password, //to match backend set up in auth controller DTO
                id,
                token,
            })

            console.log('RESET PW RESPONSE', response.data);

            //clear form
            setPassword('');
            setSecondPW('');
            navigate('/log-in');

            toaster.create({
                      title: 'Success!',
                      description: 'Your password has been reset--please log in with your new password!',
                      duration: 5000,
                    })

        } catch (error) {
            //console.log('RESET PW ERROR', error)

            toaster.create({
                title: 'Error',
                description: 'We cannot reset your password at this time. Please start the reset password process again!',
                duration: 3000,
            })
        }
    };
  return (
    <Box>
            <Heading textAlign='center' mb={4}>Reset Your Password</Heading>
            <Box maxW='30%' display='flex' flexDirection='column' alignItems='center' m='0 auto' gap={4}>
    
                <Field.Root invalid={isErrorPW} required>
                    <Field.Label>
                        New Password
                    <Field.RequiredIndicator />    
                    </Field.Label>
                    <Input type='password' onChange={handlePWChange} value={password}/>
                    {
                        !isErrorPW ? null : (
                            <Field.HelperText>A valid password is required.</Field.HelperText>
                        )
                    }
                </Field.Root>

                <Field.Root invalid={isErrorSecondPW} required>
                    <Field.Label>
                        Re-enter Password
                    <Field.RequiredIndicator />    
                    </Field.Label>
                    <Input type='password' onChange={handleSecondPWChange} value={secondPW}/>
                    {
                        !isErrorSecondPW ? null : (
                            <Field.HelperText>Passwords must match.</Field.HelperText>
                        )
                    }
                </Field.Root>
    
                <Button w='100%' onClick={handleSubmit}>Submit</Button>
    
    
            </Box>
        </Box>
  )
}

export default ResetPW