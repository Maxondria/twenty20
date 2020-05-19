import React, { createContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
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

  useEffect(() => {
    if (data?.profile) {
      setAuthUser(data.profile);
    }

    if (error) {
      setAuthUser(null);
    }
  }, [data, error]);

  return (
    <AuthUserContext.Provider value={{ authUser, client, setUser }}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
