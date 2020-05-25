import styled from "styled-components";

export const AuthWrapper = styled.div`
  border-top: 12px solid #1890ff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AuthFormContainer = styled.div`
  width: 90%;
  max-width: 350px;
`;

export const ErrorBox = styled.div`
  color: red;
  height: 24px;
  font-size: 12px;
`;

export const AuthFormLinks = styled.div`
  margin-top: 12px;
`;

export const GreyLinks = styled.li`
  display: flex;
  color: #6e8483;
  transition: 0.5s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

export const IntlDiv = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;

  span {
    margin-right: 10px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: #1890ff;
    }
  }

  .active-lang {
    text-decoration: underline;
    color: #1890ff;
  }
`;
