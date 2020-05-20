import React, { useContext } from "react";
import { notification } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useRouteMatch, NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import LoginForm from "../../components/forms/login";
import { AuthUserContext } from "../../contexts/User";
import {
  AuthWrapper,
  AuthFormContainer,
  AuthFormLinks,
} from "../../styles/commonStyles";

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
          notification.error({ message: res?.errors[0]?.message });
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
            id="app.title.accessaccount"
            defaultMessage="Access account"
          />
        </h1>
        <LoginForm login={login} submitting={loading} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <AuthFormLinks>
            <NavLink to={`/${match.params.lang}/signup`}>
              <FormattedMessage
                defaultMessage="Register"
                id="app.text.register"
              />
            </NavLink>
          </AuthFormLinks>
          <AuthFormLinks>
            <NavLink to={`/${match.params.lang}/requestreset`}>
              <FormattedMessage
                defaultMessage="Forgotten password?"
                id="app.text.Forgottenpassword"
              />
            </NavLink>
          </AuthFormLinks>
        </div>
      </AuthFormContainer>
    </AuthWrapper>
  );
};

export default Login;
