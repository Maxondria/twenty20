import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import HomePage from "../pages/Landing/Home";

const Home = () => {
  const match = useRouteMatch();
  console.log(match);

  return (
    <Switch>
      <Route exact path="/:lang/">
        <HomePage />
      </Route>
    </Switch>
  );
};

export default Home;
