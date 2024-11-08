import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { LeaderboardProvider } from './context/leaderboardContext';
import Home from './pages/home';
import Leaderboard from './pages/leaderboard';
import Login from './pages/login';
import Registration from './pages/registration';

function App() {
  return (
    <AuthProvider>
      <LeaderboardProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </LeaderboardProvider>
    </AuthProvider>
  );
}

export default App;