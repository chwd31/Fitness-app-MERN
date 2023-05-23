import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import ExercisePage from './components/ExercisePage';
import ProfilePage from './components/ProfilePage';
import WeeklyStatsPage from './components/WeeklyStatsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

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
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <>
              <ExercisePage />
              <ProfilePage />
              <WeeklyStatsPage />
            </>
          ) : (
            <HomePage />
          )}
        </Route>
        <Route path="/login">
          {isLoggedIn ? (
            <ExercisePage />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/signup">
          {isLoggedIn ? (
            <ExercisePage />
          ) : (
            <SignupPage onLogin={handleLogin} />
          )}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
