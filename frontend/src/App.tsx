// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css';
import { Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import Header from './Components-R/Header';
import { Outlet } from 'react-router-dom';

function App() {
  

  return (
    <>
      <Header />
      <Outlet />
      {/* <Box m={10} display='flex' flexDirection='column'  gap={4}>
        <Input onChange={handleNameChange} placeholder='Type in a name'/>
        <Input onChange={handleUsernameChange} placeholder='Type in a username'/>
        <Input onChange={handleEmailChange} placeholder='Type in an email'/>
        <Input onChange={handlePasswordChange} placeholder='Type in a password'/>
        <Button onClick={handleClick}>Add User</Button>
      </Box> */}
    </>
  )
}

export default App
