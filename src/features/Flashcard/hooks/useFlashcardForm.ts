import { useState, useEffect } from 'react';
import { getFlashcardById } from '../services/flashcardService';


export const useFlashcardForm = ( id:string ) => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    fetchData(id);
  }, [id]);


  const fetchData = async (id:string) => {
    try {
      const item = await getFlashcardById(id);
      setQuestion(item.question);
      setAnswer(item.answer);
    } catch (err) {
      setError('Không tải được dữ liệu câu hỏi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { question, answer, loading, error, fetchData };
};