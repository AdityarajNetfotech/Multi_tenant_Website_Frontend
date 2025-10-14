import { useState } from 'react';
import { Info, Edit, Copy, Trash2, Clock, RefreshCcw, Check, X } from 'lucide-react';

export default function QuestionMaker({ questions, onUpdate, onNext, onBack }) {
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editedData, setEditedData] = useState(null);

    const sampleQuestions = questions.length > 0 ? questions : [
        {
            id: 1,
            text: 'Which tool is commonly used for creating wireframes?',
            options: [
                { id: 'A', text: 'Blender', isCorrect: false },
                { id: 'B', text: 'Figma', isCorrect: true },
                { id: 'C', text: 'After Effects', isCorrect: false },
                { id: 'D', text: 'Unity', isCorrect: false },
            ],
            correctAnswer: 'B',
            explanation: 'Figma, Adobe XD, and Balsamiq are popular tools for UI/UX wireframing and prototyping',
            tags: ['Wireframe'],
            skills: ['Wireframing'],
            time: '30',
            difficulty: 'Medium',
            questionType: 'MCQ',
            marks: '2'
        }
    ];

    const handleEditClick = (question) => {
        setEditingQuestion(question);
        setEditedData({
            ...question,
            questionType: question.questionType || 'MCQ',
            timeLimit: question.time || '30',
            marks: question.marks || '2',
            level: question.difficulty || 'Medium',
            skills: question.skills || question.tags || [],
            questionText: question.text,
            options: question.options || question.options.map((opt, idx) => ({
                id: String.fromCharCode(65 + idx),
                text: opt.replace(/^[A-D]\.\s*/, ''),
                isCorrect: opt.startsWith(question.correctAnswer)
            }))
        });
    };

    const handleSaveEdit = () => {
        if (onUpdate) {
            onUpdate(editingQuestion.id, editedData);
        }
        setEditingQuestion(null);
        setEditedData(null);
    };

    const handleCancelEdit = () => {
        setEditingQuestion(null);
        setEditedData(null);
    };

    const updateOptionText = (id, text) => {
        setEditedData({
            ...editedData,
            options: editedData.options.map(opt => opt.id === id ? { ...opt, text } : opt)
        });
    };

    const toggleCorrectAnswer = (id) => {
        setEditedData({
            ...editedData,
            options: editedData.options.map(opt => ({ ...opt, isCorrect: opt.id === id }))
        });
    };

    const addOption = () => {
        const newId = String.fromCharCode(65 + editedData.options.length);
        setEditedData({
            ...editedData,
            options: [...editedData.options, { id: newId, text: '', isCorrect: false }]
        });
    };

    const removeOption = (id) => {
        setEditedData({
            ...editedData,
            options: editedData.options.filter(opt => opt.id !== id)
        });
    };

    const removeSkill = (skill) => {
        setEditedData({
            ...editedData,
            skills: editedData.skills.filter(s => s !== skill)
        });
    };

    const isQuestionComplete = editedData?.questionText?.trim() !== '' &&
        editedData?.options?.every(opt => opt.text.trim() !== '') &&
        editedData?.options?.some(opt => opt.isCorrect);

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

            <div className="p-6 border border-gray-300 shadow-md rounded-xl">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Test Question</h2>
                </div>

                <div className="space-y-4">
                    {sampleQuestions.map((question) => (
                        <div key={question.id} className="bg-white p-4 sm:p-6 border border-gray-300 shadow-md rounded-xl">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-3 flex-1">
                                    <span className="text-lg font-semibold text-gray-900 shrink-0">Q{question.id}</span>
                                    <div className="flex-1">
                                        <p className="text-sm sm:text-base text-gray-900 font-medium mb-4">{question.text}</p>

                                        <div className="space-y-2 mb-4">
                                            {(typeof question.options[0] === 'string' ? question.options : question.options.map(opt => `${opt.id}. ${opt.text}`)).map((option, idx) => (
                                                <div key={idx} className="flex items-start sm:items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        checked={option.startsWith(question.correctAnswer)}
                                                        readOnly
                                                        className="w-4 h-4 text-blue-600 mt-0.5 sm:mt-0 shrink-0"
                                                    />
                                                    <label className="text-xs sm:text-sm text-gray-700 break-words">{option}</label>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-green-50 border border-green-200 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                                            <p className="text-xs sm:text-sm font-semibold text-green-800 mb-1">
                                                Correct Answer: {question.correctAnswer}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-700">
                                                <span className="font-semibold">Explanation:</span> {question.explanation}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4 text-xs sm:text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} className="sm:w-4 sm:h-4" />
                                                <span>{question.time}s</span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                                {(question.tags || question.skills || []).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 sm:py-1 bg-orange-100 text-orange-700 rounded text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                                {question.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:flex-col xl:flex-row gap-1 sm:gap-2 justify-end lg:justify-start shrink-0">
                                    <button 
                                        onClick={() => handleEditClick(question)}
                                        className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                    >
                                        <Edit className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                    </button>
                                    <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                        <RefreshCcw className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                    </button>
                                    <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                        <Copy className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                    </button>
                                    <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                        <Trash2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={onBack}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                    >
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="px-6 py-2 bg-[#9157ED] text-white rounded-lg hover:bg-[#7940d6] font-medium"
                    >
                        Next
                    </button>
                </div>
            </div>

            {editingQuestion && editedData && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                                <h2 className="text-2xl font-bold text-gray-800">Q{editingQuestion.id}</h2>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                                        <Check className="w-4 h-4" />
                                        Editing
                                    </span>
                                    <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors border border-gray-300">
                                        <RefreshCcw className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors border border-gray-300">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors border border-gray-300">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={handleCancelEdit}
                                        className="p-2 hover:bg-gray-100 rounded border border-gray-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                                    <select
                                        value={editedData.questionType}
                                        onChange={(e) => setEditedData({...editedData, questionType: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>MCQ</option>
                                        <option>True/False</option>
                                        <option>Short Answer</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time limit</label>
                                    <select
                                        value={editedData.timeLimit}
                                        onChange={(e) => setEditedData({...editedData, timeLimit: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>30</option>
                                        <option>60</option>
                                        <option>90</option>
                                        <option>120</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Marks</label>
                                    <select
                                        value={editedData.marks}
                                        onChange={(e) => setEditedData({...editedData, marks: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>5</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                    <select
                                        value={editedData.level}
                                        onChange={(e) => setEditedData({...editedData, level: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>Easy</option>
                                        <option>Medium</option>
                                        <option>Hard</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md bg-gray-50 min-h-[42px]">
                                    {editedData.skills.map(skill => (
                                        <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            {skill}
                                            <button onClick={() => removeSkill(skill)} className="hover:text-blue-900">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                                <textarea
                                    value={editedData.questionText}
                                    onChange={(e) => setEditedData({...editedData, questionText: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
                                    placeholder="Enter your question here..."
                                />
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Options (Select the correct answer)
                                    </label>
                                    <button
                                        onClick={addOption}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors"
                                    >
                                        + Add box
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {editedData.options.map((option) => (
                                        <div key={option.id} className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700 w-6">{option.id}.</span>
                                            <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) => updateOptionText(option.id, e.target.value)}
                                                onClick={() => toggleCorrectAnswer(option.id)}
                                                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    option.isCorrect ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
                                                }`}
                                                placeholder="Enter option text..."
                                            />
                                            <button
                                                onClick={() => removeOption(option.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {isQuestionComplete && (
                                <div className="mb-6 p-3 bg-[#C2FABA] border border-green-300 rounded-md text-green-700 text-sm">
                                    Question {editingQuestion.id} is ready and complete.
                                </div>
                            )}

                            <div className="flex justify-center gap-4">
                                <button 
                                    onClick={handleSaveEdit}
                                    className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}