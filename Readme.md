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
   git clone https://github.com/Taiwoayodeji/Project-4.git
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

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
