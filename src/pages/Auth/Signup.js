import React, { useContext } from "react";
import { toaster } from "evergreen-ui";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { AuthUserContext } from "../../contexts/User";
import { AuthWrapper, AuthFormContainer } from "../../styles/commonStyles";
import SignupForm from "../../components/forms/signup";

const SIGNUP = gql`
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
const SignupPage = () => {
  const history = useHistory();
  const { setUser } = useContext(AuthUserContext);
  const [signupFunc, { loading }] = useMutation(SIGNUP, {
    errorPolicy: "all",
  });

  const signup = (values) => {
    signupFunc({
      variables: { email: values.email, password: values.password },
    })
      .then((res) => {
        if (res?.errors) {
          toaster.danger(res?.errors[0]?.message);
          return;
        }

        if (res?.data) {
          localStorage.setItem("token", res.data?.login?.token);
          setUser(res?.data?.login?.user);
          toaster.success(
            `Welcome, ${res.data?.login?.user?.firstname} ${res.data?.login?.user?.lastname}`,
            {
              id: "auth-toast",
            }
          );
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
