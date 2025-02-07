import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Accordion, Button, Form, ListGroup } from 'react-bootstrap';

const QuestionsList = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [newQuestionTitle, setNewQuestionTitle] = useState(""); // Store new question title
  const [newQuestionBody, setNewQuestionBody] = useState(""); // Store new question body

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

  const fetchAnswers = (question_id) => {
    axios.get(`http://localhost:3001/api/answers?question_id=${question_id}`)
      .then(response => {
        setQuestionAnswers(prev => ({
          ...prev,
          [question_id]: response.data,
        }));
      })
      .catch(error => {
        console.error('Error fetching answers:', error);
      });
  };

  useEffect(() => {
    questions.forEach(question => {
      fetchAnswers(question.question_id);
    });
  }, [questions]);

  const handleAnswerChange = (event, question_id) => {
    setAnswers({
      ...answers,
      [question_id]: event.target.value,
    });
  };

  const handleAnswerSubmit = (event, question_id) => {
    event.preventDefault();
    const body = answers[question_id];

    if (!user?.user_id) {
      console.error("User is not authenticated");
      return;
    }

    axios.post('http://localhost:3001/api/answers', {
      question_id,
      user_id: user.user_id,
      body,
    })
    .then(response => {
      console.log('Answer submitted:', response.data);
      setAnswers({
        ...answers,
        [question_id]: '',
      });
      fetchAnswers(question_id);
    })
    .catch(error => {
      console.error('Error submitting answer:', error);
    });
  };
  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    if (!newQuestionTitle.trim() || !newQuestionBody.trim()) return;
  
    axios.post('http://localhost:3001/api/questions', {
      title: newQuestionTitle,
      body: newQuestionBody,
      user_id: user?.user_id || "Anonymous",
    })
    .then(() => {
      return axios.get('http://localhost:3001/api/questions'); // Refetch questions
    })
    .then(response => {
      setQuestions(response.data);
      setNewQuestionTitle("");
      setNewQuestionBody("");
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      {/* Ask a Question Section */}
      <h2 className="text-center mb-4">Question & Answers</h2>
      <Form onSubmit={handleQuestionSubmit} className="mb-4 p-3 border rounded shadow-sm">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter question title..." 
            value={newQuestionTitle} 
            onChange={(e) => setNewQuestionTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Body</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Describe your question in detail..." 
            value={newQuestionBody} 
            onChange={(e) => setNewQuestionBody(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">Submit Question</Button>
      </Form>

      {/* Questions List */}
      {questions.map((question, index) => (
        <div key={question.question_id} className="mb-4 p-3 border rounded shadow-sm">
          <Row>
            <Col>
              <h5>{question.title}</h5>
              <p>{question.body}</p>
            </Col>
          </Row>

          {/* Answers Dropdown */}
          <Accordion>
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>View Answers</Accordion.Header>
              <Accordion.Body>
                {questionAnswers[question.question_id]?.length > 0 ? (
                  <ListGroup>
                    {questionAnswers[question.question_id].map((answer) => (
                      <ListGroup.Item key={answer.answer_id}>
                        <p>{answer.body}</p>
                        <small className="text-muted">Answered by: {answer.user_name}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p>No answers yet.</p>
                )}

                {/* Answer Submission Form */}
                <Form onSubmit={(event) => handleAnswerSubmit(event, question.question_id)} className="mt-3">
                  <Form.Group>
                    <Form.Control 
                      type="text" 
                      placeholder="Write your answer..." 
                      value={answers[question.question_id] || ""} 
                      onChange={(event) => handleAnswerChange(event, question.question_id)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" size="sm" className="mt-2">Submit Answer</Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
