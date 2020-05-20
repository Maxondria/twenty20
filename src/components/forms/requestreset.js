import React from "react";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorBox } from "../../styles/commonStyles";
import { useIntl } from "react-intl";
import { messages } from "../../utils/commonwords";

const RequestresetForm = ({ submit, submitting }) => {
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
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(intl.formatMessage(messages.invalidemail))
        .required(intl.formatMessage(messages.required)),
    }),
    onSubmit: (values) => {
      submit(values);
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="requestResetForm">
        <Input
          data-testid="requestResetEmail"
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

        <Button
          loading={submitting}
          disabled={submitting}
          type="primary"
          htmlType="submit"
          block
          size="large"
          data-testid="loginButton"
        >
          {intl.formatMessage(messages.requestReset)}
        </Button>
      </form>
    </>
  );
};

export default RequestresetForm;
