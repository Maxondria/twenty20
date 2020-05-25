import React from "react";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorBox } from "../../styles/commonStyles";
import { useIntl, FormattedMessage } from "react-intl";
import { messages } from "../../utils/commonwords";

const PasswordResetForm = ({ submit, submitting }) => {
  const intl = useIntl();

  const {
    handleSubmit,
    errors,
    touched,
    handleBlur,
    handleChange,
    values,
  } = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, intl.formatMessage(messages.tooshort))
        .required(intl.formatMessage(messages.required)),
      confirmpassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          intl.formatMessage(messages.passwordsMatch)
        )
        .required(intl.formatMessage(messages.required)),
    }),
    onSubmit: (values) => {
      submit(values);
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="PasswordResetForm">
        <Input
          data-testid="PasswordResetPassword"
          type="password"
          name="password"
          placeholder={intl.formatMessage(messages.password)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          size="large"
        />

        <ErrorBox data-testid="PasswordResetPasswordError">
          {touched.password && errors?.password}
        </ErrorBox>

        <Input
          data-testid="PasswordResetConfirmPassword"
          type="password"
          name="confirmpassword"
          placeholder={intl.formatMessage(messages.confirmpassword)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmpassword}
          size="large"
        />

        <ErrorBox data-testid="PasswordResetConfirmPasswordError">
          {touched.confirmpassword && errors?.confirmpassword}
        </ErrorBox>

        <Button
          loading={submitting}
          disabled={submitting}
          type="primary"
          htmlType="submit"
          block
          size="large"
          data-testid="loginButton"
        >
          <FormattedMessage
            defaultMessage="Reset password"
            id="app.text.resetpassword"
          />
        </Button>
      </form>
    </>
  );
};

export default PasswordResetForm;
