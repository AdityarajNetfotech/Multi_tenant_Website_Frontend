import { useState } from 'react';
import TestDetail from './Component/TestDetail';
import QuestionMaker from './Component/QuestionMaker';
import ReviewFinalise from './Component/ReviewFinalise';

function GenerateAssessment() {
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
        { number: 2, label: 'Question Maker' },
        { number: 3, label: 'Review & Finalise' }
    ];

    const totalSteps = steps.length;
    const clampedStep = Math.max(1, Math.min(currentStep, totalSteps || 1));
    const progress =
        totalSteps > 1 ? ((clampedStep - 1) / (totalSteps - 1)) * 100 : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Generate Assessment</h1>

            <div className="bg-white">
                <div className="">
                    <div className="relative rounded-2xl border border-gray-300 bg-white px-6 pt-5 pb-7 shadow-md">
                        <div className="flex items-start justify-between">
                            {steps.map((step) => (
                                <div key={step.number} className="flex-1 flex flex-col items-center">
                                    <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-[15px] font-semibold">
                                        {step.number}
                                    </div>
                                    <span className="mt-2 text-sm font-medium text-gray-700 text-center">
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
                </div>
            </div>

            <main className="py-8">
                {currentStep === 1 && (
                    <TestDetail
                        formData={formData}
                        onUpdate={handleFormUpdate}
                        onNext={handleNext}
                        onCancel={handleBack}
                    />
                )}
                {currentStep === 2 && (
                    <QuestionMaker
                        questions={questions}
                        onUpdate={setQuestions}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {currentStep === 3 && (
                    <ReviewFinalise formData={formData} questions={questions} />
                )}
            </main>
        </div>
    );
}

export default GenerateAssessment;