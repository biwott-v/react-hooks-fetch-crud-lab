import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [page, setPage] = useState('List');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then(r => r.json())
      .then(data => setQuestions([...questions, data]));
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions(questions.filter(question => question.id !== id));
      });
  };

  const handleUpdateQuestion = (id, correctIndex) => {
    // Immediately update local state for responsive UI
    setQuestions(questions.map(question => 
      question.id === id ? {...question, correctIndex} : question
    ));
    
    // Then send to server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    });
  };

  return (
    <main>
      <h1>Quiz App</h1>
      <button onClick={() => setPage('Form')}>New Question</button>
      <button onClick={() => setPage('List')}>View Questions</button>
      
      {page === 'Form' ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList 
          questions={questions} 
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;