import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUserContext } from "../../contexts/User";

const AuthRoute = ({ children, ...rest }) => {
  const { authUser } = useContext(AuthUserContext);

  if (authUser === undefined) {
    return <p>Loading...</p>;
  }

  if (authUser === null) {
    return <Route {...rest} render={() => children} />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )}
    />
  );
};

export default AuthRoute;
