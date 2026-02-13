import { HStack, Button } from '@chakra-ui/react';

// defines props that the component expects: its like a contract--if you use this component, you must provide these 5 props
interface ChatControlsProps {
    onClear: () => void; // means function that takes no arguments and returns nothing
    onSummarize: () => void;
    onSearch: () => void;
    hasMessages: boolean; //boolean to know if there are any messages
    isSummarizing: boolean;
}

// destructuring props or extracting the values directly
const ChatControls = ({
    onClear,
    onSummarize,
    onSearch,
    hasMessages,
    isSummarizing
}: ChatControlsProps) => {
    return (
        <HStack
          width='100%'
          justifyContent='space-between'   
          mt={2}
          mb={2}
          display={hasMessages ? 'felx' : 'none'}
        >
            <HStack wordSpacing={3}>
                <Button
                  onClick={onSummarize}
                  bg='blue.500'
                  color='white'
                  variant='outline'
                  size='sm'
                  isLoading={isSummarizing}  //isLoading prop automatically shows a spinner and changes the text
                  loadingText='Summarizing'
                  disable={!hasMessages}
                >
                    Sum
                </Button>

                <Button
                  onClick={onSearch}
                  bg='blue.500'
                  color='white'
                  variant='outline'
                  size='sm'
                  disabled={!hasMessages}
                >
                    Search
                </Button>

                <Button
                  onClick={onClear}
                  bg='blue.500'
                  color='white'
                  variant='outline'
                  size='sm'
                  disabled={!hasMessages}
                >
                    Clear
                </Button>
            </HStack>

            {/* outside inner HStack because justifycontent pushes it too far to the right*/}
            
        </HStack>
    )
}

export default ChatControls; 
