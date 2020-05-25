import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import HomePage from "../pages/Landing/Home";
import Settings from "./Settings";
import AppHeader from "../components/AppHeader";
import NoMatch from "../pages/NoMatch";
import { AuthUserContext } from "../contexts/User";

const AppWrapper = styled.div`
  height: 100vh;
`;

const MainArea = styled.div`
  background-color: #fafbfd;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  .page {
    border: 1px solid #e3ebf6;
    min-height: calc(100vh - 70px);
    overflow: auto;
    padding: 0 16px;
  }
`;

const Home = () => {
  const { authUser } = useContext(AuthUserContext);

  return (
    <AppWrapper>
      <MainArea>
        <AppHeader user={authUser} />
        <div className="page">
          <Switch>
            <Route exact path="/:lang/">
              <HomePage />
            </Route>
            <Route path="/:lang/settings">
              <Settings />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </MainArea>
    </AppWrapper>
  );
};

export default Home;
