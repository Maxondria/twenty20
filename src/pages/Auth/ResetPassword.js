import React, { useEffect, useContext } from "react";
import { AuthWrapper, AuthFormContainer } from "../../styles/commonStyles";
import { gql, useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { notification } from "antd";

import PasswordResetForm from "../../components/forms/passwordreset";
import { AuthUserContext } from "../../contexts/User";

const RESET_PASSWORD = gql`
  mutation($password: String!) {
    resetPassword(password: $password) {
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

const ResetPassword = () => {
  const history = useHistory();
  const params = useParams();
  const { setUser } = useContext(AuthUserContext);

  const [resetFunc, { loading }] = useMutation(RESET_PASSWORD, {
    errorPolicy: "all",
  });

  useEffect(() => {
    localStorage.setItem("token", params.tokenFRReset);
  }, [params.tokenFRReset]);

  const submit = (values) => {
    resetFunc({
      variables: { password: values.password },
    })
      .then((res) => {
        if (res?.errors) {
          notification.danger({ message: res?.errors[0]?.message });
          return;
        }

        if (res?.data) {
          localStorage.setItem("token", res.data?.resetPassword?.token);
          setUser(res?.data?.resetPassword?.user);
          notification.success({
            message: `Password reset success`,
            description: `You have been automatically logged in, ${res.data?.resetPassword?.user?.firstname}`,
            key: "auth-toast",
          });
          history.replace(`/${params.lang}/`);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <AuthWrapper>
      <AuthFormContainer>
        <h1>
          <FormattedMessage
            id="app.title.ChangePassword"
            defaultMessage="Change password"
          />
        </h1>
        <PasswordResetForm submit={submit} submitting={loading} />
      </AuthFormContainer>
    </AuthWrapper>
  );
};

export default ResetPassword;
