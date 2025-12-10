import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TestDetail from '../RecruiterAdmin/Component/TestDetail';
import QuestionMaker from '../RecruiterAdmin/Component/QuestionMaker';
import ReviewFinalise from '../RecruiterAdmin/Component/ReviewFinalise';
import AssessmentAPI from '../RecruiterAdmin/api/generateAssessmentApi';

function GenerateAssessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const location = useLocation();
  const filteredCandidates = location.state?.filteredCandidates || [];
  console.log("Filtered candidates received:", filteredCandidates);

  // Load selected JD from localStorage
  const [selectedJD, setSelectedJD] = useState(() => {
    const saved = localStorage.getItem("selectedJD");
    return saved ? JSON.parse(saved) : null;
  });

  // Prefill formData with selected JD info if available
  const [formData, setFormData] = useState({
    roleTitle: selectedJD?.offerId?.jobTitle || '',
    skills: selectedJD?.offerId?.skills || [],
    experience: '',
    workType: '',
    location: '',
    currency: 'INR',
    minCompensation: '',
    maxCompensation: '',
    skillLevels: [],
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  });

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!formData.roleTitle || formData.skills.length === 0) {
        setError('Please fill all required fields and add at least one skill.');
        return;
      }
      await generateQuestions();
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleFormUpdate = (patch) =>
    setFormData(prev => ({ ...prev, ...patch }));

  const generateQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = AssessmentAPI.transformToBackendPayload(formData);

      if (!payload.skills || payload.skills.length === 0) {
        throw new Error('Please select at least one skill with question counts greater than 0');
      }

      const response = await AssessmentAPI.generateTest(payload);

      if (response && response.status === 'success' && response.questions) {
        const transformedQuestions = AssessmentAPI.transformToFrontendQuestions(response.questions);
        setQuestions(transformedQuestions);
        setCurrentStep(2);
      } else {
        throw new Error(response?.message || 'Invalid response from server');
      }
    } catch (err) {
      console.error('Error generating questions:', err);
      setError(err.message || 'Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        test_title: formData.roleTitle,
        test_description: `Assessment for ${formData.roleTitle} - ${formData.experience || ''} experience`,
        job_id: selectedJD?._id || null,
        questions,
        examDate: formData.startDate,
        startTime: formData.startTime,
        endDate: formData.endDate,
        endTime: formData.endTime,
        candidates: filteredCandidates,
      };

      const response = await AssessmentAPI.finalizeTest(payload);

      if (!response || response.status !== 'success') {
        throw new Error(response?.message || 'Failed to finalize test');
      }

      const saved = JSON.parse(localStorage.getItem("jobDataList")) || [];

      const generateNextId = (existingData) => {
        if (!existingData || existingData.length === 0) return '#145756';
        const lastId = existingData[existingData.length - 1].id;
        const numeric = parseInt(lastId.replace('#','')) + 1;
        return `#${numeric}`;
      };

      const getCurrentDateString = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2,'0');
        const month = String(now.getMonth()+1).padStart(2,'0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const newAssessment = {
        id: generateNextId(saved),
        company: selectedJD?.companyName || selectedJD?.offerId?.company || "Unknown Company",
        jobTitle: formData.roleTitle,
        createdOn: getCurrentDateString(),
        questionSetId: response.question_set_id,
        totalQuestions: questions.length,
        skills: formData.skills,
        schedule: {
          startDate: formData.startDate,
          startTime: formData.startTime,
          endDate: formData.endDate,
          endTime: formData.endTime,
        },
        expiryTime: response.expiry_time,
        isActive: true,
      };

      saved.push(newAssessment);
      localStorage.setItem("jobDataList", JSON.stringify(saved));
      localStorage.setItem("jobData", JSON.stringify(newAssessment));

      navigate('/Created', {
        state: {
          testTitle: response.test_title,
          questionSetId: response.question_set_id,
          totalQuestions: questions.length,
          expiryTime: response.expiry_time,
        },
      });

    } catch (error) {
      console.error("Finalize error:", error);
      setError(error.message || "Failed to finalize test. Please try again.");
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
  const progress = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Generate Assessment</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-gray-700 font-medium">
              {currentStep === 1 ? 'Generating questions...' : 'Finalizing test...'}
            </p>
          </div>
        </div>
      )}

      {/* Step Progress Bar */}
      <div className="bg-white rounded-2xl border border-gray-300 px-6 pt-5 pb-7 shadow-md relative">
        <div className="flex items-start justify-between">
          {steps.map((step) => (
            <div key={step.number} className="flex-1 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-semibold ${
                  step.number <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 text-sm font-medium text-center ${
                  step.number <= currentStep ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
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

      {/* Step Components */}
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
