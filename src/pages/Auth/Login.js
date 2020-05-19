import React, { useContext } from "react";
import { notification } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useRouteMatch, NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import LoginForm from "../../components/forms/login";
import { AuthUserContext } from "../../contexts/User";
import { AuthWrapper, AuthFormContainer } from "../../styles/commonStyles";

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstname
        lastname
        email
        dob
        gender
        updatedAt
        createdAt
      }
    }
  }
`;
const Login = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { setUser } = useContext(AuthUserContext);

  const [loginFunc, { loading }] = useMutation(LOGIN, {
    errorPolicy: "all",
  });

  const login = (values) => {
    loginFunc({
      variables: { email: values.email, password: values.password },
    })
      .then((res) => {
        if (res?.errors) {
          notification.danger({ message: res?.errors[0]?.message });
          return;
        }

        if (res?.data) {
          localStorage.setItem("token", res.data?.login?.token);
          setUser(res?.data?.login?.user);
          notification.success({
            message: `Welcome, ${res.data?.login?.user?.firstname} ${res.data?.login?.user?.lastname}`,
            key: "auth-toast",
          });
          history.replace("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <AuthWrapper>
      <AuthFormContainer>
        <h1>
          <FormattedMessage
            id="app.greeting"
            description="Greeting to welcome the user to the app"
            defaultMessage="Hello, {name}!"
            values={{
              name: "Eric",
            }}
          />
        </h1>
        <LoginForm login={login} submitting={loading} />
        <NavLink to={`/${match.params.lang}/signup`}>Register</NavLink>
      </AuthFormContainer>
    </AuthWrapper>
  );
};

export default Login;
