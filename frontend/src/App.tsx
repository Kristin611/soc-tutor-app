// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { Box, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'

function App() {
  const [name, setName] = useState('kristin');
  const [username, setUsername] = useState('kristin4');
  const [email, setEmail] = useState('kristin4@gmail.com');
  const [password, setPassword] = useState('test');

  const handleNameChange = (event: any) => {
    // console.log('EVENT:', event)
    // console.log('EVENT-TARGET:', event.target.value);
    setName(event.target.value);
  }

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value)
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  
  const handleClick = async () => {
    const response = await axios.post('http://localhost:3000/user', {
      name, //the body to be sent via the request
      username,
      email,
      password
    })
    console.log('RESPONSE:', response.data)
  }

  return (
    <>
      <Box m={10} display='flex' flexDirection='column'  gap={4}>
        <Input onChange={handleNameChange} placeholder='Type in a name'/>
        <Input onChange={handleUsernameChange} placeholder='Type in a username'/>
        <Input onChange={handleEmailChange} placeholder='Type in an email'/>
        <Input onChange={handlePasswordChange} placeholder='Type in a password'/>
        <Button onClick={handleClick}>Add User</Button>
      </Box>
    </>
  )
}

export default App
