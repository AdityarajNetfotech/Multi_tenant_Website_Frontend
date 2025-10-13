import { Info, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReviewFinalise({ formData, questions }) {
  const navigate = useNavigate();

  const sampleQuestions = [
    {
      id: 1,
      text: 'What tools is commonly used for creating wireframes?',
      options: ['A. Blender', 'B. Figma', 'C. After Effects', 'D. Unity'],
      correctAnswer: 'B',
      explanation: 'Explanation: Figma, Adobe XD, and Balsamiq are popular tools for UI/UX wireframing and prototyping',
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 2,
      text: 'What tool is commonly used for creating wireframes?',
      options: ['A. Blender', 'B. Figma', 'C. After Effects', 'D. Unity'],
      correctAnswer: 'B',
      explanation: 'Explanation: Figma, Adobe XD, and Balsamiq are popular tools for UI/UX wireframing and prototyping',
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 3,
      text: 'What tools is commonly used for creating wireframes?',
      options: ['A. Blender', 'B. Figma', 'C. After Effects', 'D. Unity'],
      correctAnswer: 'D',
      explanation: 'Explanation: Unity is primarily used for game development, not UI/UX wireframing environments.',
      marks: 3,
      difficulty: 'Medium'
    },
    {
      id: 4,
      text: 'What is the significance of wireframing in UI/UX design process to preview, benefits and how it fits in early stage design environments.',
      options: [],
      correctAnswer: '',
      explanation: 'Explanation: Wireframing is a crucial step in the early phases of UI/UX design that visually outlines the structural layout of a web page or application, without delving into detailed design elements like colors, fonts, or images. It serves as a blueprint, illustrating placement, navigation, and content areas to appear. Listed are the main benefits of wireframing: • Clarification of ideas...',
      marks: 2,
      difficulty: 'Easy'
    }
  ];

  const totalQuestions = sampleQuestions.length;
  const totalMarks = sampleQuestions.reduce((sum, q) => sum + q.marks, 0);
  const totalTime = 60;

  const skills = [
    { name: 'Wireframe', value: 120, maxValue: 400 },
    { name: 'Prototyping', value: 260, maxValue: 400 },
    { name: 'User Research', value: 180, maxValue: 400 }
  ];

  return (
    <div className="">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Info className="text-blue-600 mt-0.5" size={20} />
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Provide Role Information</h3>
          <p className="text-sm text-gray-600">
            Recruiters manage end-to-end hiring — from creating job descriptions to shortlisting candidates and managing assessments
          </p>
        </div>
      </div>

      <div className="mb-6 border border-gray-300 shadow-md rounded-xl p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Test</h2>

        <div className="grid sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4">
            <div className="text-lg font-bold text-gray-600 mb-1">Total Questions</div>
            <div className="text-3xl font-bold text-blue-500">{totalQuestions}</div>
          </div>
          <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4">
            <div className="text-lg font-bold text-gray-600 mb-1">Total Marks</div>
            <div className="text-3xl font-bold text-blue-500">{totalMarks}</div>
          </div>
          <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4">
            <div className="text-lg font-bold text-gray-600 mb-1">Time</div>
            <div className="text-3xl font-bold text-blue-500">{totalTime} min</div>
          </div>
          <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4">
            <div className="text-lg font-bold text-gray-600 mb-1">Time</div>
            <div className="text-3xl font-bold text-blue-500">{totalTime} min</div>
          </div>
        </div>
      </div>

      <div className="mb-6 border border-gray-300 shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Details</h3>
        <div className="space-y-4">
          {sampleQuestions.map((question) => (
            <div
              key={question.id}
              className={`bg-white border border-gray-300 shadow-md rounded-xl p-4 ${question.difficulty === "Medium" && question.correctAnswer === "D"
                ? "border-red-200"
                : ""
                }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start mb-2 gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg sm:text-xl font-semibold text-gray-900">
                      Q{question.id}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-900 mb-3 break-words">
                    {question.text}
                  </p>

                  {question.options.length > 0 && (
                    <div className="space-y-1 mb-3">
                      {question.options.map((option, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          {option}
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-sm p-3 rounded-lg ${question.correctAnswer === "D" && question.difficulty === "Medium"
                      ? "bg-red-50 border border-red-200"
                      : "bg-green-50 border border-green-200"
                      }`}
                  >
                    {question.correctAnswer && (
                      <p
                        className={`font-semibold mb-1 ${question.correctAnswer === "D" &&
                          question.difficulty === "Medium"
                          ? "text-red-800"
                          : "text-green-800"
                          }`}
                      >
                        {question.correctAnswer === "D" &&
                          question.difficulty === "Medium"
                          ? "Incorrect Answer: D"
                          : `Correct Answer: ${question.correctAnswer}`}
                      </p>
                    )}
                    <p className="text-gray-700">{question.explanation}</p>
                  </div>
                </div>

                <div className="flex items-center sm:items-start gap-4 sm:ml-4 shrink-0">
                  <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 whitespace-nowrap">
                    60 sec
                  </button>
                  <span className="text-xs sm:text-sm text-green-600 hover:text-green-700 whitespace-nowrap">
                    {question.marks} marks
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-10 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Skills Overview</h1>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">Total Marks</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[500px] relative pl-10 sm:pl-12">
            <div className="absolute left-0 top-0 h-64 sm:h-80 lg:h-96 flex flex-col justify-between text-xs sm:text-sm text-gray-500 font-medium">
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>

            <div className="border-l-2 border-b-2 border-gray-300 h-64 sm:h-80 lg:h-96 relative">
              {[0, 25, 50, 75].map((percentage) => (
                <div
                  key={percentage}
                  className="absolute w-full border-t border-gray-200"
                  style={{ bottom: `${percentage}%` }}
                ></div>
              ))}

              <div className="h-full flex items-end justify-around px-4 sm:px-8 pb-2 gap-2 sm:gap-4">
                {skills.map((skill, index) => {
                  const heightPercentage = (skill.value / skill.maxValue) * 100;
                  const baseHeight = window.innerWidth < 640 ? 240 : window.innerWidth < 1024 ? 300 : 360;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center group"
                    >
                      <div className="relative flex flex-col items-center">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          {skill.value}
                        </span>

                        <div
                          className="w-12 sm:w-16 lg:w-20 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500 hover:shadow-lg cursor-pointer"
                          style={{ height: `${(heightPercentage / 100) * baseHeight}px` }}
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {skill.value} / {skill.maxValue}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start justify-around px-4 sm:px-8 mt-3 sm:mt-4">
              {skills.map((skill, index) => (
                <div key={index} className="text-center w-12 sm:w-16 lg:w-20">
                  <span className="text-xs sm:text-sm text-gray-700 font-medium break-words">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sm:hidden text-center mt-2">
          <span className="text-xs text-gray-500">← Scroll to see all skills →</span>
        </div>
      </div>

      <div className='flex justify-center'>
       <button 
        onClick={() => navigate('/RecruiterAdmin-Dashboard/GenerateAssessment/Created')} 
        className='bg-[#0496FF] rounded-3xl py-2 px-6 sm:px-8 text-sm sm:text-base text-white mt-6 hover:bg-blue-600 transition-colors'
      >
          Publish
        </button>
      </div>
    </div>
  );
}