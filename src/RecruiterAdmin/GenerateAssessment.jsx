    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import TestDetail from './Component/TestDetail';
    import QuestionMaker from './Component/QuestionMaker';
    import ReviewFinalise from './Component/ReviewFinalise';
    import AssessmentAPI from './api/generateAssessmentApi';

    function GenerateAssessment() {
        const navigate = useNavigate();
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
                { skill: 'Wireframing', level: 'Medium', mcq: 2, coding: 1, audio: 1, video: 1 },
                { skill: 'Prototyping', level: 'Any', mcq: 0, coding: 0, audio: 0, video: 0 },
                { skill: 'User Research', level: 'Any', mcq: 0, coding: 0, audio: 0, video: 0 }
            ]
        });

        const [questions, setQuestions] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const handleNext = async () => {
            // If moving from step 1 to step 2, generate questions
            if (currentStep === 1) {
                await generateQuestions();
            } else if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            }
        };

        const handleBack = () => {
            if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
                setError(null); // Clear any errors when going back
            }
        };

        const handleFormUpdate = (data) => setFormData(data);

        /**
         * Generate questions by calling backend API
         */
        const generateQuestions = async () => {
            setLoading(true);
            setError(null);

            try {
                // Transform formData to backend payload format
                const payload = AssessmentAPI.transformToBackendPayload(formData);

                // Validate that at least one skill has questions
                if (payload.skills.length === 0) {
                    throw new Error('Please select at least one skill with question counts greater than 0');
                }

                console.log('Generating questions with payload:', payload);

                // Call backend API
                const response = await AssessmentAPI.generateTest(payload);

                if (response.status === 'success' && response.questions) {
                    // Transform backend questions to frontend format
                    const transformedQuestions = AssessmentAPI.transformToFrontendQuestions(response.questions);
                    
                    console.log('Generated questions:', transformedQuestions);
                    setQuestions(transformedQuestions);
                    setCurrentStep(2); // Move to QuestionMaker step
                } else {
                    throw new Error('Invalid response from server');
                }
            } catch (err) {
                console.error('Error generating questions:', err);
                setError(err.message || 'Failed to generate questions. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        /**
         * Finalize test by saving to database
         */
        const handleFinalize = async () => {
            setLoading(true);
            setError(null);

            try {
                // Prepare finalization payload
                const payload = AssessmentAPI.prepareFinalizePayload(formData, questions);

                console.log('Finalizing test with payload:', payload);

                // Call backend API
                const response = await AssessmentAPI.finalizeTest(payload);

                if (response.status === 'success') {
                    console.log('Test finalized successfully:', response);
                    
                    // Navigate to success page
                    navigate('/RecruiterAdmin-Dashboard/JDDetails/GenerateAssessment/Created', {
                        state: {
                            testTitle: response.test_title,
                            questionSetId: response.question_set_id,
                            totalQuestions: questions.length,
                            expiryTime: response.expiry_time
                        }
                    });
                } else {
                    throw new Error('Failed to finalize test');
                }
            } catch (err) {
                console.error('Error finalizing test:', err);
                setError(err.message || 'Failed to finalize test. Please try again.');
            } finally {
                setLoading(false);
            }
        };

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

                {/* Error Display */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* Loading Overlay */}
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                <p className="text-gray-700 font-medium">
                                    {currentStep === 1 ? 'Generating questions...' : 'Finalizing test...'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white">
                    <div className="">
                        <div className="relative rounded-2xl border border-gray-300 bg-white px-6 pt-5 pb-7 shadow-md">
                            <div className="flex items-start justify-between">
                                {steps.map((step) => (
                                    <div key={step.number} className="flex-1 flex flex-col items-center">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-semibold ${
                                            step.number <= currentStep 
                                                ? 'bg-blue-500 text-white' 
                                                : 'bg-gray-200 text-gray-500'
                                        }`}>
                                            {step.number}
                                        </div>
                                        <span className={`mt-2 text-sm font-medium text-center ${
                                            step.number <= currentStep ? 'text-gray-700' : 'text-gray-400'
                                        }`}>
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
                            loading={loading}
                        />
                    )}
                    {currentStep === 2 && (
                        <QuestionMaker
                            questions={questions}
                            onUpdate={setQuestions}
                            onNext={handleNext}
                            onBack={handleBack}
                            loading={loading}
                        />
                    )}
                    {currentStep === 3 && (
                        <ReviewFinalise 
                            formData={formData} 
                            questions={questions}
                            onFinalize={handleFinalize}
                            onBack={handleBack}
                            loading={loading}
                        />
                    )}
                </main>
            </div>
        );
    }

    export default GenerateAssessment;