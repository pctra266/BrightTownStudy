import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../../api/api';

const Flashcard = () => {
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        // Gọi API: GET http://localhost:9000/flashcards?id=1
        const response = await api.get(`/flashcards?id=1`);
        // JSON Server trả về mảng (response.data là array)
        if (response.data.length > 0) {
          setFlashcard(response.data[0]);
        } else {
          setError('Không tìm thấy flashcard với id = 1');
        }
      } catch (err) {
        setError('Có lỗi khi tải dữ liệu từ server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcard();
  }, []);

  const handleToggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  return (
    <Card style={{ width: '18rem', margin: '1rem auto' }}>
      <Card.Body>
        <Card.Title>Flashcard ID: {flashcard.id}</Card.Title>
        <Card.Text>
          <strong>Question:</strong> {flashcard.question}
        </Card.Text>

        {showAnswer && (
          <Card.Text>
            <strong>Answer:</strong> {flashcard.answer}
          </Card.Text>
        )}

        <Button variant="primary" onClick={handleToggleAnswer}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </Button>
      </Card.Body>

      <Card.Footer>
        <small className="text-muted">
          Category: {flashcard.category}
          {flashcard.hint && (
            <>
              <br />
              Hint: {flashcard.hint}
            </>
          )}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default Flashcard;
