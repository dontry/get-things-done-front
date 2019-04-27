import React from "react";
import { observer, inject } from "mobx-react";
import { MessageStore } from "../stores/messageStore";
import LoginForm from "../components/LoginForm";
import { login } from "../actions/authAction";
import WithMessagePopup from "../components/WithMessagePopup";
import { MessageType } from "../types";
import { CenterContainer, CenterWrapper } from "./style";

const Login = () => {
  const LoginFormWithMessage = WithMessagePopup(LoginForm, MessageType.NETWORK);
  return (
    <CenterContainer>
      <CenterWrapper>
        <LoginFormWithMessage onSubmit={login} />
      </CenterWrapper>
    </CenterContainer>
  );
};

export default Login;
