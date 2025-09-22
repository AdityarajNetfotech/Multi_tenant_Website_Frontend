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


const App = () => {
  return (
   

      <Router>
        <Routes>

        <Route path="/landingpage" element={<LandingPage />} />
        </Routes>
      </Router>
  
    
  )
}

export default App
