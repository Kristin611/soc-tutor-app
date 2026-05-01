# Sociology Tutor - AI-Powered Learning Assistant

An intelligent tutoring application that helps sociology students explore course content through natural conversation with an AI powered by RAG (Retrieval-Augmented Generation).

## 🎯 Project Overview

This application was developed as part of my work as an adjunct sociology professor to demonstrate practical integration of AI tools in educational settings. It allows students to ask questions about their Introduction to Sociology textbook and receive contextually accurate answers.

### Key Features

- 💬 **Interactive Chat Interface** - Natural conversation with AI tutor about sociology concepts
- 📚 **RAG Pipeline** - Retrieves relevant information from the course textbook before generating answers
- 🔐 **Secure Authentication** - JWT-based user authentication and protected routes
- 📝 **Conversation Summaries** - AI-generated summaries of learning sessions
- 💾 **Session Persistence** - Chat history saved locally for privacy
- 🎨 **Clean UI** - Responsive design with sidebar layout for summaries

## 📦 Repository Structure

This project consists of two repositories:

- **[sociology-tutor](https://github.com/Kristin611/soc-tutor-app)** *(this repo)* - Frontend (React + TypeScript) and Backend (NestJS)
- **[sociology-tutor-microservice](https://github.com/Kristin611/soc-tutor-microservice)** - AI Microservice (FastAPI with RAG pipeline)

**Both repositories must be cloned and running for the full application to work.**

## 🏗️ Tech Stack

### Frontend
- **React** with TypeScript
- **Chakra UI** for component library
- **Axios** for API calls
- **React Router** for navigation

### Backend
- **NestJS** (Node.js framework)
- **JWT** for authentication
- **TypeORM** for database management
- **PostgreSQL** database

### AI Microservice
- **FastAPI** (Python)
- **LangChain** for RAG orchestration
- **Ollama** with Mistral LLM
- **ChromaDB** for vector storage
- **OpenStax Sociology Textbook** (Creative Commons licensed)

## 📋 Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL
- Ollama (for running Mistral LLM locally)

## 🚀 Installation & Setup

### 1. Clone the repository
````bash
# Clone main repository (frontend + backend)
git clone https://github.com/Kristin611/soc-tutor-app.git

# Clone microservice repository (in the same parent directory)
git clone https://github.com/Kristin611/soc-tutor-microservice.git
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### 3. Backend Setup
```bash
cd ../api
npm install
cp .env.example .env
# Configure database connection and JWT secret
npm run start:dev
```

### 4. AI Microservice Setup
```bash
# Navigate to the microservice repository
cd ../../soc-tutor-microservice
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
fastapi dev main.py
```

### 5. Database Setup
```bash
# Create PostgreSQL database
createdb soc_tutor

# Migrations will run automatically on backend start
```

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

### Backend (.env)
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=soc_tutor
DB_USERNAME=your_username
DATABASE_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

### Microservice (.env)
```
OLLAMA_MODEL=mistral
CHROMA_PERSIST_DIR=./chroma_db
```

## 📱 Usage

1. Start all three services (frontend, backend, microservice)
2. Navigate to `http://localhost:5173`
3. Create an account or log in
4. Start asking questions about sociology!
5. Use "Summarize Conversation" to get AI-generated study summaries
6. Use "Clear Chat" to start a fresh session

## 🎓 Educational Context

This project was developed as part of my presentation on "Integrating AI Tools and AI Literacy into Course Curriculum" at Houston City College. It demonstrates:

- Practical application of RAG technology in education
- Privacy-conscious AI implementation (no student data stored on servers)
- Pedagogical use of AI beyond simple chatbots
- Technical feasibility of custom educational AI tools

## 🔒 Privacy & Data

- Chat histories are stored **locally** in the browser (localStorage)
- No conversation data is saved to the database
- User authentication data is securely hashed
- Follows educational privacy best practices

## 🚧 Future Enhancements

- [ ] Assignment mode with completion tracking
- [ ] Progress dashboard showing topics explored
- [ ] Quiz generation from conversation history
- [ ] Export chat summaries as study guides
- [ ] Mobile app version

## 📝 License

This project uses the Introduction to Sociology textbook from OpenStax, which is licensed under [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## 👤 Author

**Kristin Richie**
- Adjunct Professor of Sociology at Houston City College
- LinkedIn: https://www.linkedin.com/in/kristin-richie/
- Email: kmrichie611@gmail.com

## 🙏 Acknowledgments

- OpenStax for providing free, openly-licensed educational materials
- Anthropic Claude for development assistance
- Houston City College for supporting innovative teaching methods

---

**Note**: This is a demonstration/portfolio project. For production deployment, additional considerations around scalability, cost, and institutional support would be necessary.