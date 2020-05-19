import React, { useContext } from "react";
import { toaster } from "evergreen-ui";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import LoginForm from "../../components/forms/login";
import { AuthUserContext } from "../../contexts/User";

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstname
        lastname
        email
        dob
        gender
        updatedAt
        createdAt
      }
    }
  }
`;
const Login = () => {
  const history = useHistory();
  const { setUser } = useContext(AuthUserContext);
  const [loginFunc, { loading }] = useMutation(LOGIN, {
    errorPolicy: "all",
  });

  const login = (values) => {
    loginFunc({
      variables: { email: values.email, password: values.password },
    })
      .then((res) => {
        if (res?.errors) {
          toaster.danger(res?.errors[0]?.message);
          return;
        }

        if (res?.data) {
          localStorage.setItem("token", res.data?.login?.token);
          setUser(res?.data?.login?.user);
          toaster.success(
            `Welcome, ${res.data?.login?.user?.firstname} ${res.data?.login?.user?.lastname}`,
            {
              id: "auth-toast",
            }
          );
          history.replace("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        borderTop: "12px solid #116AB8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "90%", maxWidth: "350px" }}>
        <LoginForm login={login} submitting={loading} />
      </div>
    </div>
  );
};

export default Login;
