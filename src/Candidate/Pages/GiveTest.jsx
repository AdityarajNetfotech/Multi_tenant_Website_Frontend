import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { testApi } from '../../RecruiterAdmin/api/tests.js';
import McqQuestion from '../../RecruiterAdmin/Component/McqQuestion.jsx';
import CodingQuestion from '../../RecruiterAdmin/Component/CodingQuestion';
import Timer from '../../RecruiterAdmin/Component/Timer.jsx';
// uncomment the below line if candidate needs to login before giving test!!!
// import UserEmail from '../instructions_page/UserEmail.jsx';
import InstructionsPage from '../instructions_page/InstructionsPage.jsx';
import ActivityMonitor from '../instructions_page/ActivityMonitor.jsx';
import FaceDetection from '../instructions_page/FaceDetection.jsx';
import WebCamRecorder from '../instructions_page/WebCamRecorder.jsx';
import AudioInterview from '../instructions_page/AudioInterview.jsx'; // adjust the path as needed
import { emitViolation } from '../../RecruiterAdmin/api/socket.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GiveTest = ({ jdId }) => {
  const { questionSetId } = useParams();

  // Loading / data / error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sections & navigation
  const [sections, setSections] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [allAnswers, setAllAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResults, setSubmissionResults] = useState([]);
  const candidateIdRef = useRef(`candidate_${Date.now()}`);
  const finalCandidateId = candidateIdRef.current;
  const [userInfo] = useState({
    name: `Candidate_${finalCandidateId}`,
    email: `candidate_${finalCandidateId}@mail.com`,
  });
  const [mediaAllowed, setMediaAllowed] = useState(false);
  const faceEventRef = useRef(null);
  const webcamInterviewRef = useRef(null);
  const [showWebcamInterview, setShowWebcamInterview] = useState(false);
  const [showAudioInterview, setShowAudioInterview] = useState(false);
  const [audioInterviewResults, setAudioInterviewResults] = useState([]);
  const [step, setStep] = useState('entry');
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  const [testStarted, setTestStarted] = useState(false);

  // Violations tracking
  const [violations, setViolations] = useState({
    tab_switches: 0,
    inactivities: 0,
    face_not_visible: 0,
  });
  const violationsRef = useRef(violations);

  // Keep refs in sync
  useEffect(() => {
    violationsRef.current = violations;
  }, [violations]);

  // Request camera+mic permissions
  const requestMedia = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaAllowed(true);
    } catch (err) {
      console.error('Media permissions denied:', err);
      setMediaAllowed(false);
      alert('Please allow camera and microphone access to continue the test.');
    }
  };

  // Cleanup webcam on unload
  useEffect(() => {
    const stopCamOnExit = async () => {
      if (webcamInterviewRef.current && typeof webcamInterviewRef.current.stopAll === 'function') {
        try {
          await webcamInterviewRef.current.stopAll();
        } catch (err) {
          console.warn('Cleanup webcam error:', err);
        }
      }
    };
    window.addEventListener('beforeunload', stopCamOnExit);
    return () => {
      stopCamOnExit();
      window.removeEventListener('beforeunload', stopCamOnExit);
    };
  }, []);

  // Block certain keys and context menu while test active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') ||
        (e.ctrlKey && e.key.toLowerCase() === 'p')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleContextMenu = (e) => {
      // Only block if test started and not submitted
      if (testStarted && !submitted) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [testStarted, submitted]);

  // Disable text selection & copy while test active
  useEffect(() => {
    if (!testStarted || submitted) return;

    const handleSelect = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();

    document.addEventListener('selectstart', handleSelect);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('selectstart', handleSelect);
      document.removeEventListener('copy', handleCopy);
    };
  }, [testStarted, submitted]);

  // Fetch test and organize into sections
  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        console.log("Question ID:", questionSetId)
        const data = await testApi.startTest(questionSetId);
        console.log("Fetched test data:", data);

        const mcqQuestions = data.questions.filter(q => q.type === "mcq");
        const codingQuestions = data.questions.filter(q => q.type === "coding");
        const audioQuestions = data.questions.filter(q => q.type === "audio");
        const videoQuestions = data.questions.filter(q => q.type === "video");

        const organizedSections = [];

        if (mcqQuestions.length) {
          organizedSections.push({
            name: "MCQ",
            displayName: "Multiple Choice Questions",
            questions: mcqQuestions,
            type: "mcq",
          });
        }

        if (codingQuestions.length) {
          organizedSections.push({
            name: "Coding",
            displayName: "Coding Problems",
            questions: codingQuestions,
            type: "coding",
          });
        }

        if (audioQuestions.length) {
          organizedSections.push({
            name: "Audio",
            displayName: "Audio Interview",
            questions: audioQuestions.map(q => ({
              ...q,
              content: { prompt_text: q.prompt_text }  // Normalize
            })),
            type: "audio",
          });
        }

        if (videoQuestions.length) {
          organizedSections.push({
            name: "Video",
            displayName: "Video Interview",
            questions: videoQuestions.map(q => ({
              ...q,
              content: { prompt_text: q.prompt_text }  // Normalize
            })),
            type: "video",
          });
        }

        setSections(organizedSections);

        setLoading(false);
      } catch (err) {
        console.error('Failed to load test:', err);
        setError('Failed to load test. Please check your link and try again.');
        setLoading(false);
      }
    };

    fetchTest();
  }, [questionSetId]);

  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestionsInSection = currentSection?.questions.length || 0;

  // Handle single-question answer change
  const handleAnswerChange = (answer) => {
    if (!currentQuestion) return;
    setAllAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  // Navigation: Next / Previous
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestionsInSection - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCompletedSections(prev => new Set([...prev, currentSectionIndex]));
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      handleSubmitAllSections();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
    // do not allow going back to previous section once moved forward
  };

  const handleTimeUp = () => {
    handleNext();
  };

  // Submit all sections
  const handleSubmitAllSections = async () => {
    setSubmitting(true);
    try {
      const results = [];
      for (const section of sections) {
        const responses = section.questions.map((question) => ({
          question_id: question.id,
          question_type: question.type,
          question_text:
            question.prompt_text ||
            question.content?.prompt_text ||
            question.question ||
            "",

          correct_answer:
            question.correct_answer ||
            question.content?.correct_answer ||
            "N/A",

          candidate_answer: allAnswers[question.id] || '',
        }));

        const submissionData = {
          question_set_id: questionSetId,
          section_name: section.name,
          candidate_id: finalCandidateId,
          responses,
        };

        // Debug logs (helpful during integration)
        console.log(`Submitting section ${section.name}`, submissionData);

        const result = await testApi.submitSection(submissionData);
        results.push({ sectionName: section.name, result });
      }

      setSubmissionResults(results);
      setSubmitted(true);
      toast.success("Test submitted successfully!");

      // STOP CAMERA + MONITORING AFTER SUBMIT
      try {
        // 1. Stop webcam recorder
        if (webcamInterviewRef.current && typeof webcamInterviewRef.current.stopAll === "function") {
          webcamInterviewRef.current.stopAll();
        }

        // 3. Disable further tab/inactivity/face violations
        setTestStarted(false);
      } catch (err) {
        console.warn("Failed to cleanup after submit:", err);
      }

      // 1) save violations (best-effort)
      try {
        await testApi.saveViolations({
          question_set_id: questionSetId,
          candidate_id: finalCandidateId,
          tab_switches: violationsRef.current.tab_switches || 0,
          inactivities: violationsRef.current.inactivities || 0,
          face_not_visible: violationsRef.current.face_not_visible || 0,
        });
        console.log('Violations saved');
      } catch (err) {
        console.warn('Failed to save violations', err);
      }

      // 2) optionally store candidate id to local env for other components
      window.REACT_APP_CANDIDATE_ID = finalCandidateId;
      window.REACT_APP_QUESTION_SET_ID = questionSetId;
    } catch (err) {
      console.error('Test submission error:', err);
      setError('Failed to submit test. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ActivityMonitor -> onViolation handler
  const handleViolation = (key, count = 1, flush = false) => {
    if (!['tab_switches', 'inactivities', 'face_not_visible'].includes(key)) return;
    if (submitted) return;

    setViolations(prev => {
      const updated = flush
        ? { ...prev, [key]: count }
        : { ...prev, [key]: (prev[key] || 0) + count };

      // show toasts based on violation type
      if (!submitted) {
        if (key === 'tab_switches') toast.warning('⚠️ Tab switch detected!');
        if (key === 'inactivities') toast.info('⌛ You have been inactive.');
        if (key === 'face_not_visible') toast.error('🚨 Face not visible!');
      }

      // emit to socket (best-effort)
      try {
        emitViolation({
          exam_id: jdId,
          question_set_id: questionSetId,
          candidate_email: userInfo.email,
          candidate_name: userInfo.name,
          [key]: flush ? Number(count) : 1,
        });
      } catch (e) {
        console.warn('emitViolation failed', e);
      }

      return updated;
    });
  };

  // uncomment the below line if candidate needs to login before giving test!!!
  {/* // Entry step: collect email / user details
  if (step === 'entry') {
    return (
      <UserEmail
        jdId={jdId}
        onContinue={(info) => {
          setUserInfo(info);
          setStep('instructions');
          requestMedia();
        }}
      />
    );
  } */}

  // Instructions step
  if (step === 'instructions') {
    if (instructionsVisible || !mediaAllowed) {
      return (
        <InstructionsPage
          onComplete={() => {
            requestMedia();
            setInstructionsVisible(false);
            setTestStarted(true);
            setStep('test');
          }}
          mediaAllowed={mediaAllowed}
        />
      );
    }
  }

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading test...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error && !submitting) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Submitted / results view
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
          <div className="text-green-500 text-6xl mb-4 text-center">✓</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Test Completed Successfully!
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            All sections have been submitted and evaluated.
          </p>

          <div className="space-y-6">
            {submissionResults.map((sectionResult, sectionIdx) => (
              <div key={sectionIdx} className="border rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {sectionResult.sectionName} Section
                </h3>
                <p className="text-gray-600 mb-4">{sectionResult.result.message}</p>

                {sectionResult.result.evaluations && sectionResult.result.evaluations.length > 0 && (
                  <div className="space-y-3">
                    {sectionResult.result.evaluations.map((evaluation, evalIdx) => (
                      <div
                        key={evalIdx}
                        className={`p-4 rounded-lg ${
                          evaluation.is_correct
                            ? 'bg-green-50 border-l-4 border-green-500'
                            : 'bg-red-50 border-l-4 border-red-500'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">Question {evalIdx + 1}</span>
                          <span className="text-lg font-bold">{(evaluation.score * 100).toFixed(0)}%</span>
                        </div>
                        {evaluation.feedback && (
                          <p className="text-sm text-gray-600">{evaluation.feedback}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => (window.location.href = '/')}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // When audio interview is open, show only that UI
  if (showAudioInterview) {
    return (
      <AudioInterview
        questions={currentSection?.questions || []}
        candidateId={finalCandidateId}
        questionSetId={questionSetId} 
        baseUrl={window.REACT_APP_BASE_URL || 'http://127.0.0.1:5000'}
        onClose={() => setShowAudioInterview(false)}
        onComplete={(qa) => {
          setAudioInterviewResults(qa);
          setShowAudioInterview(false);
          toast.success('Audio interview completed.');
        }}
      />
    );
  }

  // UI
  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Hidden monitoring components */}
      <ActivityMonitor
        questionSetId={questionSetId}
        candidateName={userInfo.name}
        email={userInfo.email}
        faceEventRef={faceEventRef}
        testStarted={testStarted}
        submitted={submitted}
        onViolation={handleViolation}
      />

      {!submitted && <FaceDetection faceEventRef={faceEventRef} />}

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                    Section {currentSectionIndex + 1} of {sections.length}
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {currentSection?.displayName}
                  </span>
                </div>
                <p className="text-gray-600">
                  Question {currentQuestionIndex + 1} of {totalQuestionsInSection}
                </p>
              </div>

              <Timer
                timeLimit={currentQuestion?.time_limit || 60}
                onTimeUp={handleTimeUp}
                key={`${currentSectionIndex}-${currentQuestion?.id}`}
              />
            </div>

            {/* Section Progress */}
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Section Progress</span>
                <span>{currentQuestionIndex + 1} / {totalQuestionsInSection}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / (totalQuestionsInSection || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Overall progress */}
            <div className="mt-4">
              <div className="flex gap-2">
                {sections.map((section, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 h-2 rounded-full ${
                      completedSections.has(idx)
                        ? 'bg-green-500'
                        : idx === currentSectionIndex
                        ? 'bg-blue-600'
                        : 'bg-gray-200'
                    }`}
                    title={section.displayName}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                {sections.map((section, idx) => (
                  <span
                    key={idx}
                    className={`${
                      idx === currentSectionIndex
                        ? 'font-bold text-blue-600'
                        : completedSections.has(idx)
                        ? 'text-green-600'
                        : ''
                    }`}
                  >
                    {section.name}
                    {completedSections.has(idx) && ' ✓'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Question Display */}
          {currentQuestion ? (
            <div className="mb-6">
              {(() => {
                switch (currentQuestion.type) {
                  case 'mcq':
                    return (
                      <McqQuestion
                        question={currentQuestion}
                        answer={allAnswers[currentQuestion.id]}
                        onAnswer={handleAnswerChange}
                      />
                    );

                  case 'coding':
                    return (
                      <CodingQuestion
                        question={currentQuestion}
                        answer={allAnswers[currentQuestion.id]}
                        onAnswer={handleAnswerChange}
                      />
                    );

                  case 'audio':
                    // Show placeholder if no real audio questions
                    if (currentQuestion.id === 'audio-placeholder') {
                      return (
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <p className="text-gray-600">{currentQuestion.content.prompt_text || currentQuestion.prompt_text}</p>
                        </div>
                      );
                    }

                    // Normal audio interview button/modal
                    return showAudioInterview ? (
                      <AudioInterview
                        questions={currentSection?.questions || []}
                        candidateId={finalCandidateId}
                        baseUrl={window.REACT_APP_BASE_URL || 'http://127.0.0.1:5000'}
                        onClose={() => setShowAudioInterview(false)}
                        onComplete={(qa) => {
                          setAudioInterviewResults(qa);
                          setShowAudioInterview(false);
                          toast.success('Audio interview completed.');
                        }}
                      />
                    ) : (
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <button
                          onClick={() => setShowAudioInterview(true)}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          🎙 Start Audio Interview
                        </button>
                      </div>
                    );

                  case 'video':
                    // Show placeholder if no real video questions
                    if (currentQuestion.id === 'video-placeholder') {
                      return (
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <p className="text-gray-600">
                            {currentQuestion.content.prompt_text || currentQuestion.prompt_text}
                          </p>
                        </div>
                      );
                    }

                    // Normal webcam interview button/modal
                    return showWebcamInterview ? (
                      <div className="mt-10 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Final Interview Recording</h2>

                        <WebCamRecorder
                          ref={webcamInterviewRef}
                          question={currentQuestion}
                          candidateId={finalCandidateId}
                          questionSetId={questionSetId}
                          baseUrl={window.REACT_APP_BASE_URL || 'http://127.0.0.1:5000'}
                        />

                        <button
                          onClick={async () => {
                            webcamInterviewRef.current?.endInterview();

                            setTimeout(async () => {
                              await webcamInterviewRef.current?.uploadRecording();   // upload first
                              webcamInterviewRef.current?.stopAll();
                              handleSubmitAllSections();                             // submit test AFTER upload
                            }, 1000);
                          }}
                          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                        >
                          Submit Test
                        </button>
                      </div>
                    ) : (

                      <div className="bg-white rounded-lg shadow-md p-6">
                        <button
                          onClick={() => setShowWebcamInterview(true)}
                          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                          🎥 Start Final Webcam Interview
                        </button>
                      </div>
                    );

                  default:
                    return (
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-gray-600">Unknown question type</p>
                      </div>
                    );
                }
              })()}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <p className="text-gray-600">No questions available in this section.</p>
            </div>
          )}

          {/* Navigation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="text-sm text-gray-600 text-center">
                {currentQuestionIndex === totalQuestionsInSection - 1 &&
                 currentSectionIndex === sections.length - 1 ? (
                  <span className="font-medium text-blue-600">
                    Final submission - All sections will be submitted
                  </span>
                ) : currentQuestionIndex === totalQuestionsInSection - 1 ? (
                  <div>
                    <span className="text-amber-600 font-medium">⚠️ Moving to next section</span>
                    <br />
                    <span className="text-xs text-gray-500">You cannot go back after proceeding</span>
                  </div>
                ) : null}
              </div>

              <button
                onClick={() => {
                    const hasVideoSection = sections.some(s => s.type === "video");

                    // Prevent skipping the video interview ONLY inside the Video section
                    if (
                      hasVideoSection &&
                      currentSection?.type === "video" &&
                      !showWebcamInterview &&
                      currentQuestionIndex === totalQuestionsInSection - 1
                    ) {
                      toast.error("Please complete the webcam interview before submitting.");
                      return;
                    }

                    handleNext();
                }}
                disabled={submitting}

                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
              >
                {submitting
                  ? 'Submitting...'
                  : currentQuestionIndex === totalQuestionsInSection - 1 &&
                    currentSectionIndex === sections.length - 1
                  ? 'Submit All'
                  : currentQuestionIndex === totalQuestionsInSection - 1
                  ? 'Proceed to Next Section'
                  : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiveTest;
