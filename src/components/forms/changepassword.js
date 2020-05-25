import React from "react";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorBox } from "../../styles/commonStyles";
import { useIntl, FormattedMessage } from "react-intl";
import { messages } from "../../utils/commonwords";

const ChangePasswordForm = ({ submit, submitting }) => {
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
      oldpassword: "",
    },
    validationSchema: Yup.object({
      oldpassword: Yup.string().required(intl.formatMessage(messages.required)),
      password: Yup.string()
        .notOneOf(
          [Yup.ref("oldpassword"), null],
          intl.formatMessage(messages.passwordsMustNotMatch)
        )
        // .matches(
        //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        //   {
        //     message: "Inccorect format. Example 25 or 25.1",
        //     excludeEmptyString: true,
        //   }
        // )
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
      <form onSubmit={handleSubmit} data-testid="changePasswordForm">
        <label>
          <FormattedMessage
            defaultMessage="Old password"
            id="app.text.oldpassword"
          />
        </label>
        <Input
          data-testid="changePasswordOldpassword"
          type="password"
          name="oldpassword"
          placeholder={intl.formatMessage(messages.password)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.oldpassword}
          size="large"
        />

        <ErrorBox data-testid="oldPasswordError">
          {touched.oldpassword && errors?.oldpassword}
        </ErrorBox>

        <label>
          <FormattedMessage defaultMessage="Password" id="app.text.password" />
        </label>
        <Input
          data-testid="changePasswordPassword"
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

        <label>
          <FormattedMessage
            defaultMessage="Confirm password"
            id="app.text.confirmpassword"
          />
        </label>
        <Input
          data-testid="changePasswordConfirmPassword"
          type="password"
          name="confirmpassword"
          placeholder={intl.formatMessage(messages.passwordsMatch)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmpassword}
          size="large"
        />

        <ErrorBox data-testid="confirmpasswordError">
          {touched.confirmpassword && errors?.confirmpassword}
        </ErrorBox>
        <Button
          loading={submitting}
          disabled={submitting}
          type="primary"
          htmlType="submit"
          block
          size="large"
          data-testid="changepasswordButton"
        >
          {intl.formatMessage(messages.changepassword)}
        </Button>
      </form>
    </>
  );
};

export default ChangePasswordForm;
