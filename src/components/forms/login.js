import React from "react";
import { TextInputField, Button } from "evergreen-ui";
import { useFormik } from "formik";
import * as Yup from "yup";

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
        <TextInputField
          isInvalid={errors.email && touched.email}
          label="Email"
          validationMessage={errors.email && touched.email && errors.email}
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          inputHeight={40}
        />

        <TextInputField
          isInvalid={errors.password && touched.password}
          label="Password"
          validationMessage={
            errors.password && touched.password && errors.password
          }
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          inputHeight={40}
        />

        <Button
          type="submit"
          disabled={submitting}
          isLoading={submitting}
          appearance="primary"
          height={40}
          style={{ width: "100%", display: "inline-block" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
