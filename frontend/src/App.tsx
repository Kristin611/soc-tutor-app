// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css';
import { Box, Button, Input } from '@chakra-ui/react';
import { Toaster } from "@/components/ui/toaster";
import { useState } from 'react';
import Header from './Components-R/Header';
import { Outlet, useLoaderData } from 'react-router-dom';

//callie got a typrscript error so she created a type for Data; I never got an error.
type Data = {
  email: string;
  name: string;
  username: string;
}

export type Context = {
  loggedIn: boolean;
  toggleLoggedIn: () => void; //function that has not parameters and returns nothing
}

function App() {
  const data = useLoaderData() as Data | undefined;

  //create a state for logged in or not
  const [loggedIn, setLoggedIn] = useState(data?.username !== undefined);

  // when toggleLoggedIn is called it is going to set loggedIn to the opposite of wtver it is atm
  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn)
  };

  //this is related to the toggledIn function above
  const context: Context = {
    loggedIn,
    toggleLoggedIn
  }
  
  //console.log('HEADER DATA:', data);
  console.log('LOGGED IN:', loggedIn);

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Outlet context={context}/> 
      {/* referring to context prop in Outlet above: now any children can access this state of loggedIn or !loggedIn */}
      <Toaster />
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
