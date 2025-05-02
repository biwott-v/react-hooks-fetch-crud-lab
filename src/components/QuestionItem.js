import React from 'react';

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleCorrectAnswerChange = (e) => {
    onUpdateQuestion(id, parseInt(e.target.value));
  };

  return (
    <li>
      <h4>{prompt}</h4>
      <select 
        value={correctIndex} 
        onChange={handleCorrectAnswerChange}
        aria-label="Correct Answer"
      >
        {answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>
      <button onClick={() => onDeleteQuestion(id)}>
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;