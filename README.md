# Next Quiz — AI-Powered Online Quiz Platform

## 📌 Project Overview

Next Quiz is a full-stack AI-powered online quiz platform that allows users to generate and attempt quizzes dynamically based on subject, topic, difficulty level, number of questions, and time limits. The platform integrates artificial intelligence for question generation, supports secure authentication using JWT, and maintains detailed user quiz history and performance analytics.

This project is built using the MERN stack and is designed to provide a modern, responsive, and intelligent quiz experience.
Live Website :- https://nextquiz-frontend.onrender.com

---

## 🚀 Key Features

* 🔐 **JWT-based Authentication**
  Secure login and registration with token-based session management.

* 🤖 **AI-Powered Quiz Generation**
  Dynamically generates quiz questions using an AI API based on:

  * Subject
  * Topic
  * Difficulty level
  * Number of questions
  * Time limit

* ⏱️ **Live Quiz Attempt System**

  * Countdown timer per quiz
  * Auto-submit on time expiry
  * Real-time evaluation

* 📊 **User Performance Tracking**

  * Stores quiz history
  * Tracks scores and accuracy
  * Maintains attempt records

* 📱 **Responsive UI**
  Optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5, CSS3, JavaScript
* Axios for API calls

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB (Mongoose ODM)

### Authentication

* JSON Web Tokens (JWT)
* Bcrypt for password hashing

### AI Integration

* AI API (OpenAI / Gemini or similar) for quiz question generation

---

## 🧩 System Architecture

Frontend (React)
⬇️ REST API calls
Backend (Node + Express)
⬇️
MongoDB Database
⬇️
AI API for Question Generation

---

## 🔐 Authentication Flow

1. User registers / logs in
2. Server generates JWT token
3. Token is stored in client (localStorage / cookies)
4. Token is sent with every protected API request
5. Backend verifies token before allowing access

---

## 📑 Database Schema (Main Collections)

### User Schema

* name
* email
* password (hashed)
* createdAt

### Quiz Schema

* userId
* subject
* topic
* difficulty
* totalQuestions
* timeLimit
* score
* answers

### History Schema

* userId
* quizId
* score
* accuracy
* date

---

## 🔗 REST API Endpoints (Sample)

### Authentication

* `POST /api/auth/register` – Register new user
* `POST /api/auth/login` – Login user

### Quiz

* `POST /api/quiz/generate` – Generate AI-based quiz
* `POST /api/quiz/submit` – Submit quiz answers
* `GET /api/quiz/history` – Fetch user quiz history

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js installed
* MongoDB installed / MongoDB Atlas account

---

### Backend Setup

1. Clone the repository
2. Navigate to server folder
3. Install dependencies

   ```
   npm install
   ```
4. Create `.env` file and add:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   AI_API_KEY=your_ai_api_key
   ```
5. Start backend server

   ```
   npm start
   ```

---

### Frontend Setup

1. Navigate to client folder
2. Install dependencies

   ```
   npm install
   ```
3. Start React app

   ```
   npm start
   ```

---

## 🧪 Sample Workflow

1. User registers and logs in
2. Selects quiz preferences (subject, topic, difficulty, etc.)
3. AI generates questions dynamically
4. User attempts quiz with live timer
5. Quiz is evaluated instantly
6. Score and performance are saved in history

---

## 📈 Future Enhancements

* Admin panel for quiz management
* Leaderboard system
* Question bank storage
* Multi-language support
* Detailed analytics dashboard
* Email-based result reports

---

## 👨‍💻 Author

**Ravi Garg**
Full Stack Developer | MERN Stack | AI Projects

---

## 📜 License

This project is for educational and academic purp
