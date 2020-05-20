import React, { useContext } from "react";
import { notification } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useRouteMatch, NavLink } from "react-router-dom";

import { AuthUserContext } from "../../contexts/User";
import {
  AuthWrapper,
  AuthFormContainer,
  AuthFormLinks,
} from "../../styles/commonStyles";
import SignupForm from "../../components/forms/signup";
import { FormattedMessage } from "react-intl";

const SIGNUP = gql`
  mutation signup(
    $firstname: String!
    $lastname: String!
    $email: String!
    $gender: Gender!
    $password: String!
    $dob: String
  ) {
    signup(
      firstname: $firstname
      lastname: $lastname
      email: $email
      gender: $gender
      password: $password
      dob: $dob
    ) {
      token
      user {
        email
        id
        firstname
        lastname
        dob
        gender
        createdAt
        updatedAt
      }
    }
  }
`;
const SignupPage = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { setUser } = useContext(AuthUserContext);

  const [signupFunc, { loading }] = useMutation(SIGNUP, {
    errorPolicy: "all",
  });

  const signup = (values) => {
    signupFunc({
      variables: {
        firstname: values.firstname,
        lastname: values.lastname,
        gender: values.gender,
        email: values.email,
        password: values.password,
        dob: values.dob,
      },
    })
      .then((res) => {
        if (res?.errors) {
          console.log(res?.errors);
          notification.error({ message: res?.errors[0]?.message });
          return;
        }

        if (res?.data) {
          localStorage.setItem("token", res.data?.signup?.token);
          setUser(res?.data?.signup?.user);
          notification.success({
            message: `Welcome, ${res.data?.signup?.user?.firstname} ${res.data?.signup?.user?.lastname}`,
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
            id="app.title.createaccount"
            defaultMessage="Create Account"
          />
        </h1>
        <SignupForm signup={signup} submitting={loading} />
        <AuthFormLinks>
          <FormattedMessage
            defaultMessage="Already have an account?"
            id="app.info.alreadyaccount"
          />{" "}
          <NavLink to={`/${match.params.lang}/login`}>
            <FormattedMessage defaultMessage="Login" id="app.text.login" />
          </NavLink>
        </AuthFormLinks>
      </AuthFormContainer>
    </AuthWrapper>
  );
};

export default SignupPage;
