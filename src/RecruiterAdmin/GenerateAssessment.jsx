import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TestDetail from '../RecruiterAdmin/Component/TestDetail';
import QuestionMaker from '../RecruiterAdmin/Component/QuestionMaker';
import ReviewFinalise from '../RecruiterAdmin/Component/ReviewFinalise';

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

  // Prefill formData with selected JD info if available, using full payload structure
  const [formData, setFormData] = useState({
    title: selectedJD?.offerId?.jobTitle || '',
    company: selectedJD?.companyName || selectedJD?.offerId?.company || "Unknown Company",
    location: '',
    workType: '',
    employmentMode: '',
    skills: selectedJD?.offerId?.skills || [],
    experience: '',
    description: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    isActive: true,
    questionSetId: '',
    job_id: selectedJD?._id || null,
    total_questions: 0,
    total_duration: 0,
    mini_compensation: '',
    max_compensation: '',
    currency: 'INR',
    created_at: new Date(),
    expiry_time: '',
    status: 'active',
    duration: 0,
    questions: [],
    candidates: filteredCandidates,
    skillLevels: [],
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
      // Use full formData as payload for backend
      const payload = { ...formData };

      if (!payload.skills || payload.skills.length === 0) {
        throw new Error('Please select at least one skill with question counts greater than 0');
      }

      const response = await fetch('http://localhost:4000/api/finalise/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result && result.success && result.data && result.data.questions) {
        setQuestions(result.data.questions);
        setFormData(prev => ({
          ...prev,
          questions: result.data.questions,
          total_questions: result.data.questions.length,
        }));
        setCurrentStep(2);
      } else {
        throw new Error(result?.message || 'Invalid response from server');
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
      // Use full formData as payload for backend
      const payload = { ...formData };
      // Ensure up-to-date questions and counts
      payload.questions = questions;
      payload.total_questions = questions.length;
      payload.title = formData.title || formData.roleTitle;
      payload.company = formData.company || selectedJD?.companyName || selectedJD?.offerId?.company || "Unknown Company";
      payload.job_id = formData.job_id || selectedJD?._id || null;
      payload.questionSetId = formData.questionSetId || (questions.length > 0 ? 'set_' + Math.random().toString(36).substr(2, 9) : '');
      payload.created_at = new Date();

      console.log('Finalize payload:', payload);

      const response = await fetch('http://localhost:4000/api/finalise/finalize-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!result || !result.success) {
        throw new Error(result?.message || 'Failed to finalize test');
      }

      // Optionally save to localStorage for frontend navigation
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
        company: payload.company,
        jobTitle: payload.title,
        createdOn: getCurrentDateString(),
        questionSetId: payload.questionSetId,
        totalQuestions: payload.total_questions,
        skills: payload.skills,
        schedule: {
          startDate: payload.startDate,
          startTime: payload.startTime,
          endDate: payload.endDate,
          endTime: payload.endTime,
        },
        expiryTime: payload.expiry_time,
        isActive: true,
      };

      saved.push(newAssessment);
      localStorage.setItem("jobDataList", JSON.stringify(saved));
      localStorage.setItem("jobData", JSON.stringify(newAssessment));

      navigate('/Created', {
        state: {
          testTitle: payload.title,
          questionSetId: payload.questionSetId,
          totalQuestions: payload.total_questions,
          expiryTime: payload.expiry_time,
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
