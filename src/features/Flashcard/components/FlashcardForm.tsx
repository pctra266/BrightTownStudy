import  { useState,useEffect } from 'react';
import Flashcard from './FlashcardItem';
import type { FlashcardItem,FlashcardSet } from '../types';

interface FlashcardFormProps {
  FlashcardSet?: FlashcardSet,
  onSubmit: (data:any) => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({FlashcardSet, onSubmit}) => {
  const [name, setName] = useState(FlashcardSet?.name || '');
  const [description, setDescription] = useState(FlashcardSet?.description || '');
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(
    FlashcardSet?.flashcards || [
      { id: '', question: '', answer: '' },
      { id: '', question: '', answer: '' }
    ]
  );

  const minimumFlashcards = 2;

  useEffect(() => {
    if (FlashcardSet) {
      setName(FlashcardSet.name);
      setDescription(FlashcardSet.description);
      setFlashcards(FlashcardSet.flashcards.length > 0
        ? FlashcardSet.flashcards
        : [
            { id: '', question: '', answer: '' },
            { id: '', question: '', answer: '' }
          ]
      );
    }
  }, [FlashcardSet]);

  const addMoreCard = () => {
    setFlashcards(prev => [
      ...prev,
      { id: '', question: '', answer: '' }
    ]);
  };

  const handleDelte = () =>{
    if (flashcards.length <= minimumFlashcards) {
      alert('You must have at least two flashcards.');
    }else{
    return deleteCard;
    }
  }

  const deleteCard = (index: number) => {
    setFlashcards(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const payload: Omit<FlashcardSet, 'id'> = {
      name: name.trim(),
      description: description.trim(),
      flashcards: flashcards
        .filter(f => f.question.trim() !== '' || f.answer.trim() !== '')
        .map(f => ({
          id: f.id || crypto.randomUUID(),
          question: f.question.trim(),
          answer: f.answer.trim()
        }))
    };
      if (FlashcardSet?.id) {
        onSubmit({ ...payload, id: FlashcardSet.id });
      } else {
        onSubmit(payload);
      }
  };
  
  const updateCard = (index: number, field: 'question' | 'answer', value: string) => {
    setFlashcards(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  
  return (
    <>
    <form onSubmit={handleSubmit}>
       <label htmlFor='name'>Name: 
       <input id='name' type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
       </label>
       <label htmlFor="description">Description
        <input id='description' type="text" onChange={(e) => setDescription(e.target.value)} value={description}/>
       </label>
      {
        flashcards.map((flashcard: FlashcardItem,index) => (
          <Flashcard key={index} flashcard={flashcard} onDelete={handleDelte} onChange={(field, value) => updateCard(index, field, value)} />
        ))
      }
      <button type='button' onClick={addMoreCard} >Add more card</button>
      <button type="submit">Done</button>
    </form>
     
    </>


  );
};

export default FlashcardForm;