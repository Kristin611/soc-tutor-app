import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

export class AskQuestionDto {
    question: string;
}

@Controller('api/sociology')
@UseGuards(AuthGuard)
export class SociologyController {

    @Post('ask')
    async askQuestion(@Body() askQuestionDto: AskQuestionDto) {
        console.log('=== NESTJS CONTROLLER: Ask question endpoint hit ===');
        console.log('Request body received:', askQuestionDto);
        console.log('Question:', askQuestionDto.question);

        try {
            console.log('About to call FastAPI microservice at http://127.0.0.1:8000/ask');

            //call fastapi microservice
            const microserviceResponse = await fetch('http://127.0.0.1:8000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: askQuestionDto.question
                })
            });

            console.log('Fastapi response status:', microserviceResponse.status);

            if (!microserviceResponse.ok) {
                throw new Error(`FastAPI returned ${microserviceResponse.status}`)
            }

            const data = await microserviceResponse.json();
            console.log('Fastapi RESPONSE DATA:', data);

            return { answer: data.answer};

        } catch (error) {
            console.error('Error calling Fastapi microservice:', error);

            //fallback to test response if microservice fails
            return {
                answer: `Microservice error: ${error.message}. Fallback: You asked "${askQuestionDto.question}"`
            }
        }
    }

    @Get('test')
        testEndpoint() {
        console.log('=== TEST ENDPOINT HIT ===');
        return { message: 'Sociology controller is working!' };
}

}