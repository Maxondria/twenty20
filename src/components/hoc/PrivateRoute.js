import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUserContext } from "../../contexts/User";

const PrivateRoute = ({ children, lang, ...rest }) => {
  const { authUser } = useContext(AuthUserContext);
  if (authUser === undefined) {
    return <p>Loading...</p>;
  }

  if (authUser === null) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: `/${lang}/login`,
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return <Route {...rest} render={() => children} />;
};

export default PrivateRoute;
