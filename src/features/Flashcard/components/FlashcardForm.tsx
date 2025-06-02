import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FlashcardForm.css';

interface FlashcardFormProps {
  initialQuestion?: string;
  initialAnswer?: string;
  onSubmit: (data: { question: string; answer: string }) => Promise<void>;
  loading?: boolean;
  error?: string;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ initialQuestion = '', initialAnswer = '', onSubmit, loading = false, error = '' }) => {
  const [question, setQuestion] = React.useState<string>(initialQuestion);
  const [answer, setAnswer] = React.useState<string>(initialAnswer);
  const navigate = useNavigate();

  React.useEffect(() => {
    setQuestion(initialQuestion);
  }, [initialQuestion]);
  
  React.useEffect(() => {
    setAnswer(initialAnswer);
  }, [initialAnswer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ question, answer });
  };

  return (
    <div className="flashcard-form-container">
      <h2>{initialQuestion ? 'Edit Flashcard' : 'Create Flashcard'}</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="flashcard-form">
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="button" onClick={() => navigate(-1)} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlashcardForm;