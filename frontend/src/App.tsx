// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { Box, Button } from '@chakra-ui/react'

function App() {
  
  const handleClick = async () => {
    const response = await axios.get('http://localhost:3000')
    console.log('RESPONSE:', response)
  }

  return (
    <>
      <Box>
        <Button onClick={handleClick}>Click Me</Button>
      </Box>
    </>
  )
}

export default App
