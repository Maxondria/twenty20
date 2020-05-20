import React, { useContext, useEffect } from "react";
import { Switch, useHistory, Redirect, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import styled from "styled-components";
import LoginPage from "../pages/Auth/Login";
import SignupPage from "../pages/Auth/Signup";
import RequestReset from "../pages/Auth/RequestReset";
import PrivateRoute from "../components/hoc/PrivateRoute";
import AuthRoute from "../components/hoc/AuthRoute";
import { IntlContext } from "../contexts/Intl";

import fr from "antd/es/locale/fr_FR";
import de from "antd/es/locale/de_DE";
import es from "antd/es/locale/es_ES";

import loc_de from "../translations/de.json";
import loc_es from "../translations/es.json";
import loc_fr from "../translations/fr.json";
import Home from "./Home";
import ResetPassword from "../pages/Auth/ResetPassword";

const data = {
  de: loc_de,
  es: loc_es,
  fr: loc_fr,
};

const antData = {
  de: de,
  es: es,
  fr: fr,
};

const languages = ["en", "de", "es", "fr"];

// const language = navigator.language.split(/[-_]/)[0];
const IntlDiv = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;

  span {
    margin-right: 10px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: #1890ff;
    }
  }

  .active-lang {
    text-decoration: underline;
    color: #1890ff;
  }
`;

const App = () => {
  const { lang, setLang } = useContext(IntlContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const constLang = location.pathname.substring(1, 3);
    setLang(constLang, history);
  }, []); // eslint-disable-line
  return (
    <>
      <IntlProvider locale={lang} messages={data[lang]}>
        <ConfigProvider locale={antData[lang]}>
          <Switch>
            <AuthRoute path="/:lang/login/" lang={lang}>
              <LoginPage />
            </AuthRoute>
            <AuthRoute path="/:lang/signup/">
              <SignupPage />
            </AuthRoute>
            <AuthRoute path="/:lang/requestreset/">
              <RequestReset />
            </AuthRoute>
            <AuthRoute path="/:lang/passwordreset/:tokenFRReset">
              <ResetPassword />
            </AuthRoute>
            <PrivateRoute path="/:lang/" lang={lang}>
              <Home />
            </PrivateRoute>
            <Redirect to={`/${lang}/`} />
          </Switch>
        </ConfigProvider>
      </IntlProvider>
      <IntlDiv>
        {languages.map((language) => (
          <span
            key={language}
            onClick={() => setLang(language, history)}
            className={lang === language ? "active-lang" : ""}
          >
            {language}
          </span>
        ))}
      </IntlDiv>
    </>
  );
};

export default App;
