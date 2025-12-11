import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentAPI from '../../RecruiterAdmin/api/generateAssessmentApi';

export default function Examination() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const candidateRaw = sessionStorage.getItem("candidateData");
        const candidate = candidateRaw ? JSON.parse(candidateRaw) : null;
        const selectedJDRaw = localStorage.getItem("selectedJD");
        const selectedJD = selectedJDRaw ? JSON.parse(selectedJDRaw) : null;
        console.log("Loaded candidate:", candidate);
        console.log("Loaded selectedJD:", selectedJD);

        if (!candidate || !selectedJD || !selectedJD._id) {
          setJobs([
            {
              title: "No Examination Available",
              location: "—",
              description: "You have not been shortlisted for the test.",
              isActive: false,
              startDate: "—",
              startTime: "—",
              endDate: "—",
              endTime: "—",
            },
          ]);
          return;
        }

        // Robustly check if candidate is filtered for this JD
        let isFiltered = false;
        let filteredEntry = null;
        if (candidate && selectedJD && Array.isArray(selectedJD.filteredCandidates)) {
          const candidateIdStr = String(candidate._id || candidate.id || "");
          filteredEntry = selectedJD.filteredCandidates.find(c => String(c.candidate) === candidateIdStr);
          isFiltered = !!filteredEntry;
          console.log("Checking filteredCandidates:", selectedJD.filteredCandidates.map(c => c.candidate), "against candidateId:", candidateIdStr);
        }
        console.log("Is candidate filtered?", isFiltered);

        if (!isFiltered) {
          setJobs([
            {
              title: "No Examination Available",
              location: "—",
              description: "You have not been shortlisted for the test.",
              isActive: false,
              startDate: "—",
              startTime: "—",
              endDate: "—",
              endTime: "—",
            },
          ]);
          return;
        }

        // Use AssessmentAPI to fetch finalized test for candidate and JD
        const candidateId = candidate._id || candidate.id;
        let finalisedTestResult = null;
        try {
          finalisedTestResult = await AssessmentAPI.getFinalizedTest(candidateId, selectedJD._id);
        } catch (apiErr) {
          console.error('Error fetching finalized test from AssessmentAPI:', apiErr);
        }
        console.log("Finalised test API result for candidate", candidateId, "and JD", selectedJD._id, ":", finalisedTestResult);

        if (
          finalisedTestResult 
        ) {
          // If the backend returns an array, use the first one
          const test = Array.isArray(finalisedTestResult.data) ? finalisedTestResult.data[0] : finalisedTestResult.data;
          setJobs([
            {
              title: finalisedTestResult.title || "Assessment",
              company: finalisedTestResult.company || "Unknown Company",
              location: finalisedTestResult.location || "Remote",
              workType: finalisedTestResult.workType || "Full-time",
              employmentMode: finalisedTestResult.employmentMode || "On-site",
              skills: Array.isArray(finalisedTestResult.skills) ? finalisedTestResult.skills : [],
              description: finalisedTestResult.description || "This is an assessment for your role.",
              startDate: finalisedTestResult.startDate || "Today",
              startTime: finalisedTestResult.startTime || "10:00 AM",
              endDate: finalisedTestResult.endDate || "—",
              endTime: finalisedTestResult.endTime || "—",
              isActive: typeof finalisedTestResult.isActive === 'boolean' ? finalisedTestResult.isActive : true,
              questionSetId: finalisedTestResult.questionSetId || finalisedTestResult.job_id || "assessment",
              questions: Array.isArray(finalisedTestResult.questions) ? finalisedTestResult.questions : [],
              aiScore: finalisedTestResult.aiScore !== null && finalisedTestResult.aiScore !== undefined ? finalisedTestResult.aiScore : (filteredEntry?.aiScore ?? null),
              aiExplanation: finalisedTestResult.aiExplanation !== null && finalisedTestResult.aiExplanation !== undefined ? finalisedTestResult.aiExplanation : (filteredEntry?.aiExplanation ?? null)
            },
          ]);
        } else {
          setJobs([
            {
              title: "No Assessment Found",
              location: "—",
              workType: "—",
              employmentMode: "—",
              description:
                "No assessment has been generated yet. Please check back later.",
              startDate: "—",
              startTime: "—",
              endDate: "—",
              endTime: "—",
              isActive: false,
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching assessment from backend", err);
        setJobs([
          {
            title: "No Assessment Found",
            location: "—",
            workType: "—",
            employmentMode: "—",
            description:
              "No assessment has been generated yet. Please check back later.",
            startDate: "—",
            startTime: "—",
            endDate: "—",
            endTime: "—",
            isActive: false,
          },
        ]);
      }
    };
    fetchAssessment();
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Available Examinations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-300 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
          >
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>

              <p className="text-red-500 text-sm sm:text-base mb-4">{job.location}</p>

              {job.workType && (
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-3 py-1 text-xs sm:text-sm font-medium text-green-700 bg-green-50 border border-green-300 rounded-xl">
                    {job.workType}
                  </span>

                  <span className="px-3 py-1 text-xs sm:text-sm font-medium text-purple-700 bg-purple-50 border border-purple-300 rounded-xl">
                    {job.employmentMode}
                  </span>
                </div>
              )}

              <p className="text-gray-600 text-sm leading-relaxed mb-2">{job.description}</p>

              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-xs sm:text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-xl">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-2 text-sm sm:text-base mb-4">
                <div className="flex">
                  <span className="font-semibold text-gray-900 min-w-[100px]">From:</span>
                  <span className="text-gray-700 ml-2">
                    {job.startDate} at {job.startTime}
                  </span>
                </div>

                <div className="flex">
                  <span className="font-semibold text-gray-900 min-w-[100px]">To:</span>
                  <span className="text-gray-700 ml-2">
                    {job.endDate} at {job.endTime}
                  </span>
                </div>
              </div>
            </div>

            <hr />

            <div className="flex justify-end">
              <button
                onClick={() =>
                  navigate(`/Candidate-Dashboard/Examination/TestDetails/${job.questionSetId}`)
                }
                disabled={!job.isActive}
                className={`mt-2 w-[100px] py-2 rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 ${
                  job.isActive
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Give Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
