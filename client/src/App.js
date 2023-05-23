import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ExercisePage from "./components/ExercisePage";
import ProfilePage from "./components/ProfilePage";
import WeeklyStatsPage from "./components/WeeklyStatsPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    // Perform additional actions based on the user data if needed
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
        {isLoggedIn && (
          <>
            <Route path="/exercise" element={<ExercisePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/weeklystats" element={<WeeklyStatsPage />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
