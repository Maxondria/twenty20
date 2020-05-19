import React from "react";
import moment from "moment";
import { Input, Button, Col, Row, Select, DatePicker } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorBox } from "../../styles/commonStyles";
import { useIntl } from "react-intl";
import { messages } from "../../utils/commonwords";

const { Option } = Select;
const SignupForm = ({ signup, submitting }) => {
  const intl = useIntl();

  const {
    handleSubmit,
    errors,
    touched,
    handleBlur,
    handleChange,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      gender: "Unspecified",
      dob: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(2, intl.formatMessage(messages.tooshort))
        .max(50, intl.formatMessage(messages.toolong))
        .trim()
        .required(intl.formatMessage(messages.required)),
      lastname: Yup.string()
        .min(2, intl.formatMessage(messages.tooshort))
        .max(50, intl.formatMessage(messages.toolong))
        .trim()
        .required(intl.formatMessage(messages.required)),
      gender: Yup.mixed()
        .oneOf(["Male", "Female", "Unspecified"])
        .required(intl.formatMessage(messages.required)),
      dob: Yup.string()
        .test("dob", intl.formatMessage(messages.lessthan18), (value) => {
          return moment().diff(moment(value), "years") >= 18;
        })
        .required("Required"),
      email: Yup.string()
        .email(intl.formatMessage(messages.invalidemail))
        .required(intl.formatMessage(messages.required)),
      password: Yup.string().required(intl.formatMessage(messages.required)),
      confirmpassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          intl.formatMessage(messages.passwordsMatch)
        )
        .required(intl.formatMessage(messages.required)),
    }),
    onSubmit: (values) => {
      signup({
        firstname: values.firstname,
        lastname: values.lastname,
        gender: values.gender,
        email: values.email,
        password: values.password,
        dob: moment(values.dob).format("YYYY-MM-DD"),
      });
    },
  });

  return (
    <form onSubmit={handleSubmit} data-testid="signupForm">
      <Row gutter={16}>
        <Col span={12}>
          <Input
            data-testid="signupFirstname"
            type="text"
            name="firstname"
            placeholder={intl.formatMessage(messages.firstname)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstname}
            size="large"
          />
          <ErrorBox data-testid="firstnameError">
            {touched.firstname && errors?.firstname}
          </ErrorBox>
        </Col>
        <Col span={12}>
          <Input
            data-testid="signupLastname"
            type="text"
            name="lastname"
            placeholder={intl.formatMessage(messages.lastname)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastname}
            size="large"
          />
          <ErrorBox data-testid="lastnameError">
            {touched.lastname && errors?.lastname}
          </ErrorBox>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input
            data-testid="signupEmail"
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
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DatePicker
            allowClear={false}
            style={{ width: "100%" }}
            data-testid="signupDOB"
            placeholder={intl.formatMessage(messages.dob)}
            onChange={(value) => setFieldValue("dob", value)}
            value={values.dob}
            size="large"
          />
          <ErrorBox data-testid="dobError">
            {touched.dob && errors?.dob}
          </ErrorBox>
        </Col>

        <Col span={12}>
          <Select
            data-testid="signupGender"
            style={{ width: "100%" }}
            size="large"
            defaultValue="Unspecified"
            onChange={(value) => setFieldValue("gender", value)}
          >
            <Option value="Unspecified">
              {intl.formatMessage(messages.unspecified)}
            </Option>
            <Option value="Male">{intl.formatMessage(messages.male)}</Option>
            <Option value="Female">
              {intl.formatMessage(messages.female)}
            </Option>
          </Select>

          <ErrorBox data-testid="genderError">
            {touched.gender && errors?.gender}
          </ErrorBox>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Input
            data-testid="signupPassword"
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
        </Col>

        <Col span={12}>
          <Input
            data-testid="signupPasswordConfirm"
            type="password"
            name="confirmpassword"
            placeholder={intl.formatMessage(messages.confirmpassword)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmpassword}
            size="large"
          />
          <ErrorBox data-testid="confirmPasswordError">
            {touched.confirmpassword && errors?.confirmpassword}
          </ErrorBox>
        </Col>
      </Row>

      <Button
        loading={submitting}
        disabled={submitting}
        type="primary"
        htmlType="submit"
        block
        size="large"
        data-testid="loginButton"
      >
        {intl.formatMessage(messages.register)}
      </Button>
    </form>
  );
};

export default SignupForm;
