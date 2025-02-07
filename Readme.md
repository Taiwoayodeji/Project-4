# Q/A Web Application

## Overview

This is a simple Q/A (Questions and Answers) web application where users can log in, ask questions, and submit answers. The project is built using React for the frontend and communicates with a backend API.

## Features

- User Authentication (Login & Sign Out)
- Post and View Questions
- Submit Answers
- Responsive Design

## Technologies Used

- React.js
- React Router
- Bootstrap
- Axios (for API requests)
- Express.js (Backend - assumed API)
- Node.js (Backend - assumed API)

## Installation

### Prerequisites

- Node.js and npm installed
- A running backend API at `http://localhost:3001`

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Taiwoayodeji/Project-4
   cd Project-4
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open the app in your browser at `http://localhost:3000`

## API Endpoints (Assumed)

- `GET /api/questions` - Fetches all questions
- `POST /api/answers` - Submits an answer
- `POST /api/login` - Handles user login
- `POST /api/signup` - Handles user registration

## Database Schema

### Users Table

```sql
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Questions Table

```sql
CREATE TABLE Questions (
  question_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  title varchar(200) NOT NULL,
  body text NOT NULL,
  PRIMARY KEY (question_id),
  KEY user_id (user_id),
  CONSTRAINT questions_ibfk_1 FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Answers Table

```sql
CREATE TABLE `Answers` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `body` text NOT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `question_id` (`question_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `Questions` (`question_id`) ON DELETE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
