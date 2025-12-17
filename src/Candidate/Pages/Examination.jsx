import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentAPI from '../../RecruiterAdmin/api/generateAssessmentApi';

export default function Examination() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [now, setNow] = useState(new Date());
  const regex = / \d{2}:\d{2}:\d{2} GMT/;

  // Update current time every second for countdown
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch exams on mount
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const candidateRaw = sessionStorage.getItem("candidateData");
        const candidate = candidateRaw ? JSON.parse(candidateRaw) : null;

        if (!candidate) {
          setJobs([{
            title: "No Examination Available",
            location: "—",
            description: "You have not been shortlisted for the test.",
            isActive: false,
            startDate: "—",
            startTime: "—",
            endDate: "—",
            endTime: "—",
          }]);
          return;
        }

        const candidateId = candidate._id || candidate.id;
        const finalisedTestResults = await AssessmentAPI.getFinalizedTest(candidateId);

        if (!Array.isArray(finalisedTestResults) || finalisedTestResults.length === 0) {
          setJobs([{
            title: "No Examination Available",
            location: "—",
            description: "You have not been shortlisted for the test.",
            isActive: false,
            startDate: "—",
            startTime: "—",
            endDate: "—",
            endTime: "—",
          }]);
          return;
        }

        // Filter out completed tests and map exams
        const availableTests = finalisedTestResults
          .filter(test => test.aiScore === null || test.aiScore === undefined)
          .map(test => {
            const startDateTime = new Date(`${test.exam_date.replace(regex, "")} ${test.test_start}`);
            const endDateTime = new Date(`${test.end_date.replace(regex, "")} ${test.test_end}`);

            return {
              title: test.title || "Assessment",
              company: test.company,
              location: test.location || "API Response Check",
              workType: test.workType || "API Response Check",
              skills: Array.isArray(test.skills) ? test.skills : [],
              description: test.description || "This is an assessment for your role.",
              startDate: test.exam_date.replace(regex, "") || "Today",
              startTime: test.test_start || "10:00 AM",
              endDate: test.end_date.replace(regex, "") || "—",
              endTime: test.test_end || "—",
              questionSetId: test.questionSetId || test.question_set_id || "assessment",
              questions: Array.isArray(test.questions) ? test.questions : [],
              aiScore: test.aiScore ?? null,
              aiExplanation: test.aiExplanation ?? null,
              startDateTime,
              endDateTime
            };
          });

        setJobs(availableTests.length > 0 ? availableTests : [{
          title: "No Active Examinations",
          location: "—",
          description: "No tests are currently available to take.",
          isActive: false,
          startDate: "—",
          startTime: "—",
          endDate: "—",
          endTime: "—",
        }]);
      } catch (err) {
        console.error("Error fetching assessment from backend", err);
        setJobs([{
          title: "No Assessment Found",
          location: "—",
          workType: "—",
          employmentMode: "—",
          description: "No assessment has been generated yet. Please check back later.",
          startDate: "—",
          startTime: "—",
          endDate: "—",
          endTime: "—",
          isActive: false,
        }]);
      }
    };

    fetchAssessment();
  }, []);

  // Countdown helper
  const getCountdown = (startDateTime) => {
    const diff = startDateTime - now;
    if (diff <= 0) return "00:00:00";

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Available Examinations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => {
          const isActive = now >= job.startDateTime && now <= job.endDateTime;
          const hasStarted = now >= job.startDateTime;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-300 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                <p className="text-red-500 text-sm sm:text-base mb-4">{job.location}</p>

                {job.workType && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 text-xs sm:text-sm font-medium text-green-700 bg-green-50 border border-green-300 rounded-xl">{job.workType}</span>
                  </div>
                )}

                <p className="text-gray-600 text-sm leading-relaxed mb-2">{job.description}</p>

                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 text-xs sm:text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-xl">{skill}</span>
                    ))}
                  </div>
                )}

                <div className="space-y-2 text-sm sm:text-base mb-4">
                  <div className="flex">
                    <span className="font-semibold text-gray-900 min-w-[100px]">From:</span>
                    <span className="text-gray-700 ml-2">{job.startDate} at {job.startTime}</span>
                  </div>

                  <div className="flex">
                    <span className="font-semibold text-gray-900 min-w-[100px]">To:</span>
                    <span className="text-gray-700 ml-2">{job.endDate} at {job.endTime}</span>
                  </div>
                </div>
              </div>

              <hr />

              <div className="flex justify-end items-center mt-2">
                {!hasStarted && (
                  <span className="text-sm text-orange-500 mr-2">
                    Starts in: {getCountdown(job.startDateTime)}
                  </span>
                )}

                {hasStarted && now > job.endDateTime && (
                  <span className="text-sm text-red-500 mr-2">Test Ended</span>
                )}

                <button
                  onClick={() => navigate(`/Candidate-Dashboard/Examination/TestDetails/${job.questionSetId}`)}
                  disabled={!isActive}
                  className={`w-[100px] py-2 rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Give Test
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
