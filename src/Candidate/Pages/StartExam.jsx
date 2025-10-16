import { useState } from 'react';
import TestDetails from '../Component/TestDetails';
import CameraCheck from '../Component/CameraCheck';
import QuestionSolving from '../Component/QuestionSolving';

function StartExam() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        roleTitle: 'UI/UX Designer',
        skills: ['Wireframing', 'Prototyping', 'User Research'],
        experience: '2 Years',
        workArrangement: 'Full Time',
        location: 'Kolkata',
        currency: 'INR',
        minCompensation: '3000000',
        maxCompensation: '5000000',
        skillLevels: [
            { skill: 'Wireframing', level: 'Medium', mcq: 2, essay: 1, video: 1 },
            { skill: 'Prototyping', level: 'Any', mcq: 0, essay: 0, video: 0 },
            { skill: 'User Research', level: 'Any', mcq: 0, essay: 0, video: 0 }
        ]
    });

    const [questions, setQuestions] = useState([]);

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleFormUpdate = (data) => setFormData(data);

    const steps = [
        { number: 1, label: 'Test Details' },
        { number: 2, label: 'Camera Check' },
        { number: 3, label: 'Question Solving' }
    ];

    const totalSteps = steps.length;
    const clampedStep = Math.max(1, Math.min(currentStep, totalSteps || 1));
    const progress = totalSteps > 1 ? ((clampedStep - 1) / (totalSteps - 1)) * 100 : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Start Exam</h1>

            <div className="bg-white">
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex-1 relative rounded-2xl border border-gray-300 bg-white px-6 pt-5 pb-7 shadow-md">
                        <div className="flex items-start justify-between">
                            {steps.map((step) => (
                                <div key={step.number} className="flex-1 flex flex-col items-center">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-semibold transition-colors
                                        ${currentStep >= step.number
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-600'}`}>
                                        {step.number}
                                    </div>
                                    <span className={`mt-2 text-sm font-medium text-center
                                        ${currentStep === step.number
                                            ? 'text-blue-600'
                                            : 'text-gray-700'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="absolute left-4 right-4 bottom-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                            />
                        </div>
                    </div>

                    {currentStep === 3 && (
                        <div className="flex-shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1658140239938-f5f1c00cabdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                                alt="User"
                                className="w-40 h-40 rounded-2xl object-cover border border-gray-300 shadow-md"
                            />
                        </div>
                    )}
                </div>
            </div>

            <main className="py-8">
                {currentStep === 1 && (
                    <TestDetails
                        formData={formData}
                        onUpdate={handleFormUpdate}
                        onNext={handleNext}
                        onCancel={handleBack}
                    />
                )}
                {currentStep === 2 && (
                    <CameraCheck
                        questions={questions}
                        onUpdate={setQuestions}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {currentStep === 3 && (
                    <QuestionSolving
                        formData={formData}
                        questions={questions}
                        onBack={handleBack}
                    />
                )}
            </main>
        </div>
    );
}

export default StartExam;