import React from "react";
import RegisterForm from "../components/RegisterForm";
import { register } from "../actions/authAction";
import { MessageType } from "../types";
import { CenterContainer, CenterWrapper } from "./style";
import WithMessagePopup from "../components/WithMessagePopup";

const Register = () => {
  const RegisterFormWithErrorMessage = WithMessagePopup(RegisterForm, MessageType.NETWORK);
  return (
    <CenterContainer>
      <CenterWrapper>
        <RegisterFormWithErrorMessage onSubmit={register} />
      </CenterWrapper>
    </CenterContainer>
  );
};

export default Register;
