// src/QuestionsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:3001/api/questions')
      .then(response => {
        setQuestions(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
<h2 className="text-center mb-4">Questions</h2>      <ul>
        {questions.map((question) => (
          <li key={question.question_id}>
            <h3>{question.title}</h3>
            <p>{question.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
