import React from "react";
import { message } from "antd";
import { observer, inject } from "mobx-react";
import RegisterForm from "../components/RegisterForm";
import { login } from "../actions/authAction";
import { MessageType } from "../types";
import { CenterContainer, CenterWrapper } from "./style";
import WithMessagePopup from "../components/WithMessagePopup";

const Register = () => {
  const RegisterFormWithErrorMessage = WithMessagePopup(RegisterForm, MessageType.NETWORK);
  return (
    <CenterContainer>
      <CenterWrapper>
        <RegisterFormWithErrorMessage onSubmit={login} />
      </CenterWrapper>
    </CenterContainer>
  );
};

export default Register;
