import React from "react";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorBox } from "../../styles/commonStyles";
const LoginForm = ({ login, submitting }) => {
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
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
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
          placeholder="Email"
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
          placeholder="Password"
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
          Log in
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
