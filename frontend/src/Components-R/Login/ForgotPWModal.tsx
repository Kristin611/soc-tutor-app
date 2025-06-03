import { toaster } from '@/components/ui/toaster';
import { Button, Dialog, Input, Portal } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { isInvalidEmail } from "@/utils/emailValidation";

const ForgotPWModal = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        console.log('EMAIL', email)

        //validate user email before it gets sent to the backend 
        const invalidEmail = isInvalidEmail(email);
        if (invalidEmail) {
            toaster.create({
                title: 'Error',
                description: 'Please enter a valid email address.',
                duration: 5000,
            });
            return;
            
        };

        try {
            const response = await axios.post('http://localhost:3000/auth/reset-password', {
                email
            });
            setEmail('');
            console.log('RESPONSE FE', response.data);

            toaster.create({
                title: 'Success!',
                description: 'Check your email for instructions to reset your account.',
                duration: 5000,
            })

        } catch (error) {
            console.log('FORGOT PW ERROR', error);

            toaster.create({
                title: 'Error',
                description: 'Please enter a valid email address.',
                duration: 5000,
            })
        }
    }
  return (
    <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button>Reset Password</Button>
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header display='flex' justifyContent='space-between' alignItems='center'>
                            <Dialog.Title>Reset Your Password</Dialog.Title>
                            <Dialog.ActionTrigger asChild>
                                 <Button>X</Button>
                            </Dialog.ActionTrigger>
                          </Dialog.Header>
                          <Dialog.Body>
                            <p>
                              Please enter the email address associated with your account.
                            </p>
                            <Input mt={2} type='text' onChange={handleEmailChange}/>
                          </Dialog.Body>
                          <Dialog.Footer>
                            {/* <Dialog.ActionTrigger asChild>
                              <Button>Cancel</Button>
                            </Dialog.ActionTrigger> */}
                            <Button onClick={handleSubmit}>Send Verification Email</Button>
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
              </Dialog.Root>
  )
}

export default ForgotPWModal