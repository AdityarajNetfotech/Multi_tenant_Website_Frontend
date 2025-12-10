import React from 'react';

export default function McqQuestion({ question, answer, onAnswer }) {
  const data = question.content || question;

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">
        {data.question || "No question text"}
      </h2>

      <div className="space-y-3">
        {data.options?.map((option, idx) => (
          <label
            key={idx}
            className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
          >
            <input
              type="radio"
              name="mcq-option"
              value={option}
              checked={answer === option}
              onChange={(e) => onAnswer(e.target.value)}
              className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
