import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Change 1: Import Routes instead of Switch
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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes> {/* Change 2: Replace Switch with Routes */}
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogin={handleLogin} />} /> {/* Change 3: Use element prop */}
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />} /> {/* Change 3: Use element prop */}
        <Route path="/signup" element={<SignupPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />} /> {/* Change 3: Use element prop */}
        {isLoggedIn && (
          <>
            <Route path="/exercise" element={<ExercisePage />} /> {/* Change 3: Use element prop */}
            <Route path="/profile" element={<ProfilePage />} /> {/* Change 3: Use element prop */}
            <Route path="/weeklystats" element={<WeeklyStatsPage />} /> {/* Change 3: Use element prop */}
          </>
        )}
      </Routes> {/* Change 2: Close Routes */}
      <Footer />
    </Router>
  );
};

export default App;
