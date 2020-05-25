import React, { createContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { notification } from "antd";

export const AuthUserContext = createContext(null);

const PROFILE_QUERY = gql`
  query {
    profile {
      id
      firstname
      lastname
      email
      gender
      dob
    }
  }
`;

const AuthUserContextProvider = (props) => {
  const [authUser, setAuthUser] = useState(undefined);
  const { data, error, client } = useQuery(PROFILE_QUERY, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const setUser = (user) => {
    setAuthUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    client.resetStore();
    notification.info({
      message: "Goodbye",
      key: "auth-toast",
    });
  };

  useEffect(() => {
    if (data && data.profile) {
      setAuthUser(data?.profile);
    }

    if (data && data.profile === null) {
      setAuthUser(null);
    }

    if (error) {
      setAuthUser(null);
    }
  }, [data, error]);

  return (
    <AuthUserContext.Provider value={{ authUser, client, setUser, logout }}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
