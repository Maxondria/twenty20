import React from "react";
import {
  AuthWrapper,
  AuthFormContainer,
  AuthFormLinks,
} from "../../styles/commonStyles";
import { gql, useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { useRouteMatch, NavLink } from "react-router-dom";
import { notification } from "antd";

import RequestresetForm from "../../components/forms/requestreset";

const REQUEST_RESET = gql`
  mutation {
    requestReset(email: "mdmad7@gmail.com") {
      message
      token
    }
  }
`;

const RequestReset = () => {
  const match = useRouteMatch();

  const [resetFunc, { loading }] = useMutation(REQUEST_RESET, {
    errorPolicy: "all",
  });

  const submit = (values) => {
    resetFunc({
      variables: { email: values.email },
    })
      .then((res) => {
        if (res?.errors) {
          notification.danger({ message: res?.errors[0]?.message });
          return;
        }

        if (res?.data) {
          //TODO: Remember to remove below line after email sending is complete on server
          console.log("token", res.data?.requestReset?.token);

          notification.success({
            message: `Email has been sent with instructions`,
            key: "auth-toast",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <AuthWrapper>
      <AuthFormContainer>
        <h1>
          <FormattedMessage
            id="app.title.RequestReset"
            defaultMessage="Password reset"
          />
        </h1>
        <RequestresetForm submit={submit} submitting={loading} />
        <AuthFormLinks>
          <FormattedMessage
            defaultMessage="You remember your password?"
            id="app.info.urememberurpassword"
          />{" "}
          <NavLink to={`/${match.params.lang}/login`}>
            <FormattedMessage defaultMessage="Login" id="app.text.login" />
          </NavLink>
        </AuthFormLinks>
      </AuthFormContainer>
    </AuthWrapper>
  );
};

export default RequestReset;
