import React, { useState } from "react";

const QuestionSolving = ({ onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const questions = [
    {
      id: "Q1",
      text: "Which tool is commonly used for creating wireframes?",
      options: ["A. Blender", "B. Figma", "C. After Effects", "D. Unity"],
      time: "60 sec",
      marks: "2 marks",
    },
    {
      id: "Q2",
      text: "What is the primary purpose of user research?",
      options: ["A. Design", "B. Understanding Users", "C. Coding", "D. Marketing"],
      time: "60 sec",
      marks: "2 marks",
    },
    {
      id: "Q3",
      text: "What does UX stand for?",
      options: ["A. User Execute", "B. User Experience", "C. User Export", "D. User External"],
      time: "60 sec",
      marks: "2 marks",
    },
  ];

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: option
    });
  };

  const handleEndExam = () => {
    alert("Exam Ended Successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="bg-white rounded-xl shadow-lg w-full p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Question Solving
          </h1>
          <span className="text-sm text-gray-500">
            Total Questions: {questions.length}
          </span>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {questions.map((question, index) => (
            <div 
              key={question.id}
              className="border border-gray-200 rounded-xl p-5 md:p-6 bg-gray-50"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-semibold text-lg">{question.id}</span>
                <div className="flex gap-2 text-right text-sm md:text-base">
                  <span className="text-gray-500 block">{question.time}</span>
                  <span className="text-green-600 font-medium">{question.marks}</span>
                </div>
              </div>

              <p className="text-gray-800 text-sm md:text-base mb-4">
                {question.text}
              </p>

              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer text-sm md:text-base"
                  >
                    <input
                      type="radio"
                      name={`option-${question.id}`}
                      value={option}
                      checked={selectedOptions[question.id] === option.split(". ")[0]}
                      onChange={() => handleOptionSelect(question.id, option.split(". ")[0])}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span
                      className={`${
                        selectedOptions[question.id] === option.split(". ")[0]
                          ? "text-blue-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button 
            onClick={onBack}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm md:text-base hover:bg-gray-300 transition"
          >
            Back
          </button>
          
          <button 
            onClick={handleEndExam}
            className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm md:text-base hover:bg-red-700 transition font-semibold"
          >
            End Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionSolving;