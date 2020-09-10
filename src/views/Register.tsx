import React from 'react';

import RegisterForm from '../components/RegisterForm';
import WithMessagePopup from '../components/WithMessagePopup';
import { register } from '../hooks/authHooks';
import { MessageType } from '../types';
import { CenterContainer, CenterWrapper } from './style';

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
