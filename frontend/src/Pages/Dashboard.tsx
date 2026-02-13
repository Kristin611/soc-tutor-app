import { Box, VStack, Container, Heading, Text, Input, Button, Spinner, HStack, Grid } from '@chakra-ui/react';
import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../App';
import { toaster } from '@/components/ui/toaster'; 
import ChatToolbar from '../Components-R/ChatToolbar';

//TS interface/structure to store chat messages: a blueprint that tells TS every message object must have these 4 properties
interface Message {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const context = useOutletContext() as Context; 

  const [currentQuestion, setCurrentQuestion] = useState(''); //stores what user is currently typing
  const [isLoading, setIsLoading] = useState(false); //boolean to track if API call is happening
  const [messages, setMessages] = useState<Message[]>([]); //array that stores chat history
  const autoScroll = useRef<HTMLDivElement>(null); //useRef creates a pointer to a DOM element
  const [summary, setSummary] = useState(''); //its a string '' (and not array []) bc its the AI's written summary, not the chat itself
  const [isSummarizing, setIsSummarizing] = useState(false); //boolean to track when generating a summary (shows loading spinner on summarize button) 

  // clear chat button
  const clearChatHistory = () => {
    console.log('=== Clearing Chat History ===');

    //clear state
    setMessages([]);
    console.log('Messages state cleared');

    // clear localStorage
    localStorage.removeItem('sociology-chat-history');
    console.log('localStorage cleared');

    // toast notification
    toaster.create({
      title: 'Chat Cleared',
      description: 'Your conversation history has been deleted.',
      type: 'info',
      duration: 3000,
    })
  }

  // summarize chat history
  const handleSummarize = async () => {
    console.log('=== STARTING SUMMARIZE ===');

    // display toaster if user clicks the sum button but there are no chats to summarize 
    if (messages.length === 0) {
      console.log('No messages to summarize');
      toaster.create({
        title: 'No Chat History',
        description: 'Ask some questions first!',
        type: 'info',
        duration: 3000
      });
      return;
    }

    setIsSummarizing(true);
    console.log('Setting isSummarizing to true');

    try {
      // get last 3 messages for summarization
      const recentMessages = messages.slice(-3);
      console.log('Recent messages to summarize:', recentMessages);

      //conver to tuples format that FastAPI expects
      const chatHistory = recentMessages.map(msg => [
        msg.question,
        msg.answer
      ]);

      console.log('Chat history as tuples:', chatHistory);
      console.log('Calling /api/sociology/summarize');

      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3000/api/sociology/summarize', {
        chat_history: chatHistory // sending as array of arrays
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Summarize response:', response.data);

      // Handle the summary -- extract the text from the object
      const summaryData = response.data.summary;
      console.log('Summary DATA:', summaryData);

      // format the summary
      let summaryText = '';

      if (summaryData.topic) {
        summaryText += `**Topic:** ${summaryData.topic}\n\n`;
      }

      if (summaryData.key_points && Array.isArray(summaryData.key_points)) {
        summaryText += '**Key Points:**\n'
        summaryData.key_points.forEach((point, index) => {
          summaryText += `${index + 1}. ${point}\n\n`
        })
      }

      console.log('Formatted summary text:', summaryText);
      setSummary(summaryText);

      toaster.create({
        title: 'Summary Generated!',
        description: 'Check the left sidebar for your chat summary.',
        type: 'success',
        duration: 3000,
      })

    } catch (error: any) {
      console.error('Error generating summary:', error);
    } finally {
      setIsSummarizing(false);
      console.log('=== SUMMARIZE COMPLETE ===');
    }



  }


  // scrolls chat to the bottom
  const scrollToBottom = () => {
    autoScroll.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('sociology-chat-history');

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);

        // convert timestamp strings back to Dat objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
        console.log('Loaded chat history from localStorage:', messagesWithDates);
      } catch (error) {
        console.log('Error loading chat history:', error);
      }
    }
  }, []) // empty array means this runs once on mount

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('sociology-chat-history', JSON.stringify(messages));
      console.log('Saved chat history to localStorage.');
    }
  }, [messages]); // runs whenever messages array changes

  // runs scrollToBottom whenever messages array changes, as indicated by [messages]
  useEffect(() => {
    scrollToBottom();
  }, [messages]); //scroll whenever messages array changes

  console.log('Dashboard component rendered');
  console.log('Current question state:', currentQuestion);
  console.log('Is loading:', isLoading);
  console.log('Messages array:', messages); //updated log

  //event handler
  const handleInputchange = (e: any) => {
    //console.log('INPUT CHANGED TO:', e.target.value);
    setCurrentQuestion(e.target.value);
  }

  //submit handler
  const handleSubmitQuestion = async () => {
    //console.log('Ask button clicked');
    //console.log('QUESTION:', currentQuestion);

    console.log('=== STARTING API CALL ===');
    console.log('Question to send:', currentQuestion.trim());

    // validate: make sure there is actually a question
    if (!currentQuestion.trim()) {
    console.log('No question entered - stopping');
    return;
    }

    console.log('Setting loading to true');
    setIsLoading(true); //show loading spinner

    // API call to nestjs soc.controller and then to microservice: user question sent to controller then to microservice
    try {
      console.log('About to make axios call to /api/sociology/ask');

      // get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Token retrieved:', token ? 'Token exists' : 'No token found');

      const response = await axios.post('http://localhost:3000/api/sociology/ask', {
        question: currentQuestion.trim()
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Success! Response received:', response.data);

      // create new message object 
      const newMessage: Message = {
        id: Date.now().toString(), //simple ID for now
        question: currentQuestion.trim(),
        answer: response.data.answer,
        timestamp: new Date()
      };

      console.log('Adding new message:', newMessage);

      // add new message to the array (immutably)/update state/react re-renders 
      // [...prevMessages, newMessage] creates a new array with all old messages plus the new one.
      setMessages(prevMessages => [...prevMessages, newMessage]);

      setCurrentQuestion(''); //clear input 

    } catch (error: any) {
      console.log('=== ERROR CAUGHT ===');
      console.log('Full error:', error);
      console.log('Error response:', error.response);
      console.log('Error status:', error.response?.status);

      // handle 401 unauthorized (token expired or invalid)
      if (error.response?.status === 401) {
        console.log('401 Unauthorized detected - handling');

        localStorage.removeItem('token');
          console.log('token removed from localStorage');

          context.toggleLoggedIn();
          console.log('Context toggled');

          navigate('/login');
          console.log('Navigate to login called');

      } else {
        // other errors
        console.log('Non-401 error, showing generic error tast')
        toaster.create({
          title: 'Error',
          description: 'Failed to get response. Please try again.',
          type: 'error',
          duration: 3000,
        })
      };
      
    }

    console.log('Setting loading to false');
    setIsLoading(false);
    console.log('=== API CALL COMPLETE ===')

  };


  return (
    <Container maxW="container.xl" py={6}>
      <VStack>
        <Box>
          <Heading size='xl'>Ask a Question about Sociology!</Heading>
        </Box>

        <Grid
          templateColumns={summary ? '300px 1fr' : '1fr'}
          gap={4}
          minHeight='600px'
        >
          {/* LEFT SIDEBAR - SUMMARY */}
          {summary && (
            <Box
              bg='white'
              border='1px solid'
              borderColor='gray.300'
              borderRadius='md'
              p={4}
              overflowY='auto'
              maxHeight='600px'
            >
              <HStack justifyContent='space-between' mb={3}>
                <Text fontWeight='bold' color='purple.700'>
                  Summary
                </Text>
                <Button
                  size='xs'
                  variant='ghost'
                  onClick={() => setSummary('')}
                >
                  X
                </Button>
              </HStack>
              <Box fontSize='sm' color='gray.700' whiteSpace='pre-line'>
                {summary.split('**').map((part, index) => {
                  if (index % 2 === 1) {
                    return <Text key={index} as='span' fontWeight='bold'>{part}</Text>;
                  }
                  return <Text key={index} as='span'>{part}</Text>
                })}
              </Box>
            </Box>
          )}

          {/* RIGHT SIDEBAR - chat area */}
          <VStack align='stretch' spacing={4}>
            {(messages.length > 0 || isLoading) && (
          <Box
            width='100%'
            maxHeight='500px'
            overflowY='auto'
            // border='1px solid'
            borderRadius='md'
            p={4}
            bg='yellow.100'
            mt={4}
          >
          <VStack wordSpacing={1} align='stretch'>
            {messages.map((message) => (
              <Box key={message.id}>
                {/* user question */}
                <Box
                  bg='blue.500'
                  color='white'
                  p={3}
                  borderRadius='lg'
                  alignSelf='flex-end'
                  maxWidth='70%'
                  ml='auto'
                >
                  <Text>You:</Text>
                  <Text>{message.question}</Text>
                </Box>

                {/* AI answer */}
                <Box
                bg='white'
                border='1px solid'
                borderColor='gray.300'
                p={3}
                borderRadius='lg'
                maxWidth='80%'
                mt={2}
                >
                  <Text fontSize='sm' fontWeight='bold' color='green.600'>Sociology Tutor:</Text>
                  <Text>{message.answer}</Text>
                  <Text fontSize='xs' color='gray.500' mt={1}>
                    {message.timestamp.toLocaleTimeString()}
                  </Text>
                </Box>
              </Box>
            ))}

            {/* Loading Spinner */}
            {isLoading && (
              <Box
                bg='gray.100'
                border='1px solid'
                borderColor='gray.300'
                p={3}
                borderRadius='lg'
                maxWidth='80%'
                mt={2}
              >
                <Text fontSize='sm' fontWeight='bold' color='green.600'>Sociology Tutor</Text>
                <Box display='flex' alignItems='center' gap={2}>
                  <Spinner size='sm' color='blue.500'/>
                  <Text fontStyle='italic' color='gray.600'>Thinking...</Text>
                </Box>
              </Box>
            )}
            <div ref={autoScroll}/>
          </VStack>  

          </Box>
        )}

          

          <VStack width='100%'>
            <HStack>
                <Input
            variant="subtle"
            placeholder="Explore your textbook by asking a question about sociology..."
            value={currentQuestion}
            onChange={handleInputchange}
            width='50%'
            minWidth='500px'
            size="lg"
          />
          <ChatToolbar 
            onClear={clearChatHistory}
            onSummarize={handleSummarize}
            onSearch={() => console.log('search coming soon')}
            hasMessages={messages.length > 0}
            isSummarizing={false}    
          />
            </HStack>
        
          <Button onClick={handleSubmitQuestion} disabled={!currentQuestion.trim()}>
            Submit
          </Button>
          </VStack>
        </VStack>

        </Grid>

        
      </VStack>
    </Container>
    
  )
}

export default Dashboard