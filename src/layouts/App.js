import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/Login";
import SignupPage from "../pages/Auth/Signup";
import HomePage from "../pages/Landing/Home";
import PrivateRoute from "../components/hoc/PrivateRoute";
import AuthRoute from "../components/hoc/AuthRoute";

const App = () => {
  return (
    <Switch>
      <AuthRoute path="/login">
        <LoginPage />
      </AuthRoute>
      <Route path="/signup">
        <SignupPage />
      </Route>
      <PrivateRoute path="/">
        <HomePage />
      </PrivateRoute>
    </Switch>
  );
};

export default App;
