import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";  
import HomePage from "./components/HomePage";
import ExercisePage from "./components/ExercisePage";
import ProfilePage from "./components/ProfilePage";
import WeeklyStatsPage from "./components/WeeklyStatsPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  return
  <Router>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/exercise" component={ExercisePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/weeklystats" component={WeeklyStatsPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
    </Switch>
    <Footer />
  </Router>
};

export default App;