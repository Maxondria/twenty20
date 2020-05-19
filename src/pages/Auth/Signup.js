import React, { useContext } from "react";
import { notification } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { AuthUserContext } from "../../contexts/User";
import { AuthWrapper, AuthFormContainer } from "../../styles/commonStyles";
import SignupForm from "../../components/forms/signup";

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
        <SignupForm signup={signup} submitting={loading} />
      </AuthFormContainer>
    </AuthWrapper>
  );
};

export default SignupPage;
