// File: RecruiterAdmin/Review.jsx
// Standalone Review page (optional - can be used if navigating directly to review)

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewFinalise from './Component/ReviewFinalise';

function Review() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Get data passed from previous page
    const { formData, questions } = location.state || {};

    useEffect(() => {
        // Redirect if no data available
        if (!formData || !questions || questions.length === 0) {
            console.warn('No test data available, redirecting to assessment page');
            navigate('/RecruiterAdmin-Dashboard/JDDetails/GenerateAssessment');
        }
    }, [formData, questions, navigate]);

    const handleBack = () => {
        // Navigate back with data intact
        navigate('/RecruiterAdmin-Dashboard/JDDetails/GenerateAssessment', {
            state: { formData, questions, step: 2 }
        });
    };

    const handleFinalize = async () => {
        // This will be handled by ReviewFinalise component
        setLoading(true);
    };

    if (!formData || !questions) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Loading test data...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Review Assessment</h1>
                
                <ReviewFinalise 
                    formData={formData}
                    questions={questions}
                    onBack={handleBack}
                    onFinalize={handleFinalize}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default Review;