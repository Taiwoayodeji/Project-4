import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button } from 'react-bootstrap';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});

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

  const handleAnswerChange = (event, question_id) => {
    setAnswers({
      ...answers,
      [question_id]: event.target.value,
    });
  };

  const handleAnswerSubmit = (event, question_id) => {
    event.preventDefault();
    const answerText = answers[question_id];
    
    axios.post('http://localhost:3001/api/answers', {
      question_id,
      answer: answerText,
    })
    .then(response => {
      console.log('Answer submitted:', response.data);
    })
    .catch(error => {
      console.error('Error submitting answer:', error);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-center mb-4 ">Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.question_id}>
            <h3>{question.title}</h3>
            <p>{question.body}</p>

            <form onSubmit={(event) => handleAnswerSubmit(event, question.question_id)}>
              <Row className="mb-3">
                <Col md={5}> {/* 5 out of 12 columns (roughly 40% width) */}
                  <div className="form-group">
                    <label htmlFor={`answer-${question.question_id}`}>Your Answer:</label>
                    <textarea
                      id={`answer-${question.question_id}`}
                      className="form-control"
                      value={answers[question.question_id] || ''}
                      onChange={(event) => handleAnswerChange(event, question.question_id)}
                      placeholder="Write your answer here..."
                    />
                  </div>
                  <Button type="submit" className="btn btn-primary mt-2 w-40">Submit Answer</Button>
                </Col>
              </Row>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
