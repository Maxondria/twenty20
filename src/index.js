import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./layouts/App";
import * as serviceWorker from "./serviceWorker";
import AuthUserContextProvider from "./contexts/User";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthUserContextProvider>
        <Router>
          <App />
        </Router>
      </AuthUserContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
