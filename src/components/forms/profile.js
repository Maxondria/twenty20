import React from "react";
import moment from "moment";
import { Input, Button, Col, Row, Select, DatePicker } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorBox } from "../../styles/commonStyles";
import { useIntl, FormattedMessage } from "react-intl";
import { messages } from "../../utils/commonwords";

const { Option } = Select;
const EditProfileForm = ({ submit, submitting, user }) => {
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
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      dob: moment(user.dob),
      email: user.email,
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
    }),
    onSubmit: (values) => {
      console.log({
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
        <Col span={24}>
          <label>
            <FormattedMessage
              defaultMessage="First name"
              id="app.text.Firstname"
            />
          </label>
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
        <Col span={24}>
          <label>
            <FormattedMessage
              defaultMessage="Last name"
              id="app.text.Lastname"
            />
          </label>
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

      <Row gutter={16}>
        <Col span={24}>
          <label>
            <FormattedMessage
              defaultMessage="Date of birth"
              id="app.text.Dateofbirth"
            />
          </label>
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

        <Col span={24}>
          <label>
            <FormattedMessage defaultMessage="Gender" id="app.text.Gender" />
          </label>
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

      <Button
        loading={submitting}
        disabled={submitting}
        type="primary"
        htmlType="submit"
        block
        size="large"
        data-testid="loginButton"
      >
        {intl.formatMessage(messages.updateProfile)}
      </Button>
    </form>
  );
};

export default EditProfileForm;
