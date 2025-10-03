import React, { useState } from "react";
import Pagination from '../components/LandingPage/Pagination';

const QuestionsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 4;

    const selectedJD = {
        _id: "JD001",
        jobTitle: "Frontend Developer",
        questions: [
            {
                id: "Q001",
                question: "What is React?",
                options: [
                    "A JavaScript library for building user interfaces",
                    "A database management system",
                    "A CSS framework",
                    "A backend framework"
                ],
                answer: "A JavaScript library for building user interfaces"
            },
            {
                id: "Q002",
                question: "What are React Hooks?",
                options: [
                    "Functions that let you use state in functional components",
                    "CSS styling methods",
                    "Database connectors",
                    "API endpoints"
                ],
                answer: "Functions that let you use state in functional components"
            },
            {
                id: "Q003",
                question: "What is JSX?",
                options: [
                    "JavaScript XML syntax extension",
                    "Java Server Extension",
                    "JSON Exchange",
                    "JavaScript Export"
                ],
                answer: "JavaScript XML syntax extension"
            },
            {
                id: "Q004",
                question: "What is the Virtual DOM?",
                options: [
                    "A JavaScript representation of the real DOM",
                    "A virtual machine",
                    "A database",
                    "A CSS property"
                ],
                answer: "A JavaScript representation of the real DOM"
            },
            {
                id: "Q005",
                question: "What is useState?",
                options: [
                    "A React Hook for managing state",
                    "A database query",
                    "A CSS property",
                    "An API method"
                ],
                answer: "A React Hook for managing state"
            },
            {
                id: "Q006",
                question: "What is useEffect?",
                options: [
                    "A React Hook for side effects",
                    "A CSS animation",
                    "A testing method",
                    "A routing function"
                ],
                answer: "A React Hook for side effects"
            },
            {
                id: "Q007",
                question: "What is Props in React?",
                options: [
                    "Properties passed to components",
                    "CSS properties",
                    "Database properties",
                    "Server properties"
                ],
                answer: "Properties passed to components"
            },
            {
                id: "Q008",
                question: "What is Redux?",
                options: [
                    "A state management library",
                    "A CSS framework",
                    "A database",
                    "A server framework"
                ],
                answer: "A state management library"
            },
            {
                id: "Q009",
                question: "What is React Router?",
                options: [
                    "A library for routing in React apps",
                    "A server router",
                    "A database router",
                    "A CSS router"
                ],
                answer: "A library for routing in React apps"
            },
            {
                id: "Q010",
                question: "What is Component Lifecycle?",
                options: [
                    "Phases a component goes through",
                    "Server lifecycle",
                    "Database lifecycle",
                    "CSS animations"
                ],
                answer: "Phases a component goes through"
            },
            {
                id: "Q011",
                question: "What is Context API?",
                options: [
                    "React's built-in state management",
                    "Database API",
                    "Server API",
                    "CSS API"
                ],
                answer: "React's built-in state management"
            },
            {
                id: "Q012",
                question: "What is useMemo?",
                options: [
                    "A Hook for memoization",
                    "A database function",
                    "A CSS property",
                    "A routing method"
                ],
                answer: "A Hook for memoization"
            }
        ]
    };

    const totalPages = Math.ceil(selectedJD.questions.length / questionsPerPage);
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = selectedJD.questions.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
                <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
                    <span className="flex flex-wrap items-center gap-2">
                        <span>Questions List</span>
                    </span>
                </h1>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold rounded-full shadow border border-indigo-200 text-sm whitespace-nowrap">
                        Total: {selectedJD.questions.length}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {currentQuestions.map((q, index) => {
                    const actualQuestionNumber = startIndex + index + 1;
                    
                    return (
                        <div
                            key={q.id}
                            className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden"
                        >
                            <div className="overflow-x-auto">
                                <div className="w-full text-sm">
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-left border-b border-gray-200">
                                        <div>
                                            <div className="px-5 py-2 font-semibold flex justify-between bg-[#6D28D91F]">
                                                <span>Question {actualQuestionNumber}</span>
                                                <span>ID: {q.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="hover:bg-gradient-to-r from-indigo-50 to-purple-50 transition-all duration-200">
                                            <div className="px-5 py-3 text-gray-700">
                                                <p className="font-semibold text-gray-900 mb-1">
                                                    Q. {q.question}
                                                </p>
                                                <div className="list-disc ml-5 space-y-0.5">
                                                    {q.options && q.options.map((opt, idx) => (
                                                        <p
                                                            key={idx}
                                                            className="text-gray-600"
                                                        >
                                                            <li className="ml-5">
                                                                {opt}
                                                            </li>
                                                        </p>
                                                    ))}
                                                </div>
                                                <div className="mt-3 inline-block px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200 shadow-sm">
                                                    ✅ Correct: {q.answer}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default QuestionsList;