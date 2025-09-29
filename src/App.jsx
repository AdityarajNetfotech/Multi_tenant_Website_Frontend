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
import RecruiterRejister from './Recruiter/RecruiterRejister';
import RecruiterProfile from './Recruiter/RecruiterProfile';
import RecruiterLayout from './Recruiter/RecruiterLayout';


const App = () => {
  return (


    <Router>
      <Routes>

        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/RecruiterRejister" element={<RecruiterRejister />} />

        <Route path="/Recruiter-Dashboard" element={<RecruiterLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="RecruiterProfile" element={<RecruiterProfile />} />
        </Route>

      </Routes>
    </Router>


  )
}

export default App
