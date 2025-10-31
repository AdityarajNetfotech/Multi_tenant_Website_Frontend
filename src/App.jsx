import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

import LandingPage from './components/LandingPage/LandingPage';
import RecruiterRejister from './SuperAdmin/RecruiterRejister';
import SuperAdminProfile from './SuperAdmin/SuperAdminProfile';
import SuperAdminLayout from './SuperAdmin/SuperAdminLayout';
import Companies from './SuperAdmin/Companies';
import CompanyDetail from './SuperAdmin/CompanieDetail';
import Tickets from './SuperAdmin/Tickets';
import JD from './RecruiterAdmin/JD';
import CreateJD from './RecruiterAdmin/CreateJD';
import Assessment from './RecruiterAdmin/Assessment';
import QuestionsList from './RecruiterAdmin/QuestionsList';
import RecruiterAdminLayout from './RecruiterAdmin/RecruiterAdminLayout';
import Results from './RecruiterAdmin/Results';
import ViewResults from './RecruiterAdmin/ViewResults';
import JDDetails from './RecruiterAdmin/JDDetails';
import GenerateAssessment from './RecruiterAdmin/GenerateAssessment';
import NonCandidateList from './RecruiterAdmin/NonCandidateList';
import QuestionCreated from './RecruiterAdmin/Component/QuestionCreated';
import RejisteredRecruiters from './SuperAdmin/RejisteredRecruiters';
import AllJDs from './Candidate/Pages/AllJDs';
import CandidateLayout from './Candidate/Pages/CandidateLayout';
import Report from './Candidate/Pages/Report';
import AppliedJD from './Candidate/Pages/AppliedJD';
import Examination from './Candidate/Pages/Examination';
import StartExam from './Candidate/Pages/StartExam';
import CandidateProfile from './Candidate/Pages/CandidateProfile';
import Review from './RecruiterAdmin/Review'; // ✅ NEW: Import Review component


const App = () => {
  return (


    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/RecruiterRejister" element={<RecruiterRejister />} />

        <Route path="/Candidate-Dashboard" element={<CandidateLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="AllJDs" element={<AllJDs />} />
          <Route path="Report" element={<Report />} />
          <Route path="AppliedJD" element={<AppliedJD />} />
          <Route path="Examination" element={<Examination />} />
          <Route path="Examination/TestDetails" element={<StartExam />} />
          <Route path="CandidateProfile" element={<CandidateProfile />} />
        </Route>

        <Route path="/SuperAdmin-Dashboard" element={<SuperAdminLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="Profile" element={<SuperAdminProfile />} />
          <Route path="Companies" element={<Companies />} />
          <Route path="Companies/CompanieDetail" element={<CompanyDetail />} />
          <Route path="Tickets" element={<Tickets />} />
          <Route path="RejisteredRecruiters" element={<RejisteredRecruiters />} />
        </Route>

        <Route path="/RecruiterAdmin-Dashboard" element={<RecruiterAdminLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="JD" element={<JD />} />
          <Route path="JD/CreateJD" element={<CreateJD />} />
          <Route path="Assessment" element={<Assessment />} />
          <Route path="Assessment/QuestionsList" element={<QuestionsList />} />
          <Route path="Results" element={<Results />} />
          <Route path="JDDetails" element={<JDDetails />} />
          <Route path="JDDetails/GenerateAssessment" element={<GenerateAssessment />} />
          {/* ✅ NEW ROUTE: Questions editing page after generation */}
          <Route path="JDDetails/GenerateAssessment/QuestionsList" element={<QuestionsList />} />
          <Route path="JDDetails/GenerateAssessment/Created" element={<QuestionCreated />} />
          {/* ✅ NEW ROUTE: Standalone Review page (optional) */}
          <Route path="Review" element={<Review />} />
          <Route path="NonCandidateList" element={<NonCandidateList />} />
        </Route>

      </Routes>
    </Router>


  )
}

export default App