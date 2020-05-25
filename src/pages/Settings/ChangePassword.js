import React from "react";
import { notification } from "antd";
import { gql, useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";

import ChangePasswordForm from "../../components/forms/changepassword";

const CHANGE_PASSWORD = gql`
  mutation($password: String!, $oldpassword: String!) {
    changePassword(password: $password, oldpassword: $oldpassword) {
      message
    }
  }
`;

const ChangePassword = () => {
  const [submitFunc, { loading }] = useMutation(CHANGE_PASSWORD, {
    errorPolicy: "all",
  });

  const submit = (values) => {
    console.log(values);
    submitFunc({
      variables: { password: values.password, oldpassword: values.oldpassword },
    })
      .then((res) => {
        if (res?.errors) {
          notification.error({ message: res?.errors[0]?.message });
          return;
        }

        if (res?.data) {
          notification.success({
            message: `${res.data?.changePassword?.message}`,
            key: "auth-toast",
          });
        }
      })
      .catch((error) => console.log(error));
  };
  return <ChangePasswordForm submit={submit} submitting={loading} />;
};

export default ChangePassword;
