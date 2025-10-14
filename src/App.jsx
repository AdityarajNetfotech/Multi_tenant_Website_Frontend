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


const App = () => {
  return (


    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/RecruiterRejister" element={<RecruiterRejister />} />

        <Route path="/Candidate-Dashboard" element={<CandidateLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="AllJDs" element={<AllJDs />} />
          <Route path="Companies" element={<Companies />} />
          <Route path="Companies/CompanieDetail" element={<CompanyDetail />} />
          <Route path="Tickets" element={<Tickets />} />
          <Route path="RejisteredRecruiters" element={<RejisteredRecruiters />} />
        </Route>

        <Route path="/SuperAdmin-Dashboard" element={<SuperAdminLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="SuperAdminProfile" element={<SuperAdminProfile />} />
          <Route path="Companies" element={<Companies />} />
          <Route path="Companies/CompanieDetail" element={<CompanyDetail />} />
          <Route path="Tickets" element={<Tickets />} />
          <Route path="RejisteredRecruiters" element={<RejisteredRecruiters />} />
        </Route>

        <Route path="/RecruiterAdmin-Dashboard" element={<RecruiterAdminLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="JD" element={<JD />} />
          <Route path="CreateJD" element={<CreateJD />} />
          <Route path="Assessment" element={<Assessment />} />
          <Route path="QuestionsList" element={<QuestionsList />} />
          <Route path="Results" element={<Results />} />
          <Route path="ViewResults" element={<ViewResults />} />
          <Route path="JDDetails" element={<JDDetails />} />
          <Route path="GenerateAssessment" element={<GenerateAssessment />} />
          <Route path="GenerateAssessment/Created" element={<QuestionCreated />} />
          <Route path="NonCandidateList" element={<NonCandidateList />} />
        </Route>

      </Routes>
    </Router>


  )
}

export default App
