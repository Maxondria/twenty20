import React from "react";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorBox } from "../../styles/commonStyles";
import { useIntl } from "react-intl";
import { messages } from "../../utils/commonwords";

const LoginForm = ({ login, submitting }) => {
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(intl.formatMessage(messages.invalidemail))
        .required(intl.formatMessage(messages.required)),
      password: Yup.string().required(intl.formatMessage(messages.required)),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="loginForm">
        <Input
          data-testid="loginEmail"
          type="email"
          name="email"
          placeholder={intl.formatMessage(messages.email)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          size="large"
        />

        <ErrorBox data-testid="emailError">
          {touched.email && errors?.email}
        </ErrorBox>

        <Input
          data-testid="loginPassword"
          type="password"
          name="password"
          placeholder={intl.formatMessage(messages.password)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          size="large"
        />

        <ErrorBox data-testid="passwordError">
          {touched.password && errors?.password}
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
          {intl.formatMessage(messages.login)}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
