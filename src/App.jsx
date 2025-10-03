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
import RecruiterProfile from './SuperAdmin/SuperAdminProfile';
import RecruiterLayout from './SuperAdmin/SuperAdminLayout';
import Companies from './SuperAdmin/Companies';
import CompanyDetail from './SuperAdmin/CompanieDetail';
import Tickets from './SuperAdmin/Tickets';
import JD from './RecruiterAdmin/JD';
import CreateJD from './RecruiterAdmin/CreateJD';
import Assessment from './RecruiterAdmin/Assessment';
import QuestionsList from './RecruiterAdmin/QuestionsList';


const App = () => {
  return (


    <Router>
      <Routes>

        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/RecruiterRejister" element={<RecruiterRejister />} />

        <Route path="/Recruiter-Dashboard" element={<RecruiterLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="RecruiterProfile" element={<RecruiterProfile />} />
          <Route path="Companies" element={<Companies />} />
          <Route path="Companies/CompanieDetail" element={<CompanyDetail />} />
          <Route path="Tickets" element={<Tickets />} />
        </Route>

        <Route path="/RecruiterAdmin-Dashboard" element={<RecruiterLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="JD" element={<JD />} />
          <Route path="CreateJD" element={<CreateJD />} />
          <Route path="Assessment" element={<Assessment />} />
          <Route path="QuestionsList" element={<QuestionsList />} />
        </Route>

      </Routes>
    </Router>


  )
}

export default App
