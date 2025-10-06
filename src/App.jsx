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


const App = () => {
  return (


    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/RecruiterRejister" element={<RecruiterRejister />} />

        <Route path="/SuperAdmin-Dashboard" element={<SuperAdminLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="SuperAdminProfile" element={<SuperAdminProfile />} />
          <Route path="Companies" element={<Companies />} />
          <Route path="Companies/CompanieDetail" element={<CompanyDetail />} />
          <Route path="Tickets" element={<Tickets />} />
        </Route>

        <Route path="/RecruiterAdmin-Dashboard" element={<RecruiterAdminLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="JD" element={<JD />} />
          <Route path="CreateJD" element={<CreateJD />} />
          <Route path="Assessment" element={<Assessment />} />
          <Route path="QuestionsList" element={<QuestionsList />} />
          <Route path="Results" element={<Results />} />
          <Route path="ViewResults" element={<ViewResults />} />
        </Route>

      </Routes>
    </Router>


  )
}

export default App
