import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./layouts/App";
import "./styles/index.less";
import * as serviceWorker from "./serviceWorker";
import AuthUserContextProvider from "./contexts/User";

// import en from "antd/es/locale/en_GB";
// import fr from "antd/es/locale/fr_FR";
// import de from "antd/es/locale/de_DE";
// import es from "antd/es/locale/es_ES";

import loc_de from "./translations/de.json";
import loc_es from "./translations/es.json";
import loc_fr from "./translations/fr.json";

const data = {
  de: loc_de,
  es: loc_es,
  fr: loc_fr,
};

const language = navigator.language.split(/[-_]/)[0];

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthUserContextProvider>
      <Router>
        <IntlProvider locale={language} messages={data[language]}>
          <ConfigProvider locale={language}>
            <App />
          </ConfigProvider>
        </IntlProvider>
      </Router>
    </AuthUserContextProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
