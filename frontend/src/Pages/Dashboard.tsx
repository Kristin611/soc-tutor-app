import { Box, VStack, Container, StackSeparator, Stack, Heading, Text, Input, Button } from '@chakra-ui/react';
import { useState } from "react";

const Dashboard = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleInputchange = (e: any) => {
    console.log('INPUT CHANGED TO:', e.target.value);
    setCurrentQuestion(e.target.value);
  }

  const handleSubmitQuestion = () => {
    console.log('Ask button clicked');
    console.log('QUESTION:', currentQuestion);
  }

  if (!currentQuestion.trim()) {
    console.log('No question entered');
  }

  console.log('Would send this question to API:', currentQuestion.trim());


  return (
    <Container maxW="container.xl" py={6} border="solid">
      <VStack>
        <Box border='solid'>
          <Heading>Your Sociology Tutor</Heading>
        </Box>

        <VStack width='100%' border='solid'>
          <Input
            variant="subtle"
            placeholder="Explore your textbook and ask a question about sociology!"
            value={currentQuestion}
            onChange={handleInputchange}
            width='50%'
            minWidth='500px'
            size="lg"
          />
          <Button onClick={handleSubmitQuestion} disabled={!currentQuestion.trim()}>
            Submit
          </Button>
        </VStack>
      </VStack>
    </Container>
    
  )
}

export default Dashboard