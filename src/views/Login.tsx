import React from 'react';
import LoginForm, { ILoginFormValues } from '../components/LoginForm';
import { login } from '../hooks/authHooks';
import WithMessagePopup from '../components/WithMessagePopup';
import { MessageType } from '../types';
import { CenterContainer, CenterWrapper } from './style';
import { persistanceService } from '../classes/PersistanceService';

const Login = () => {
  const LoginFormWithMessage = WithMessagePopup(LoginForm, MessageType.NETWORK);
  return (
    <CenterContainer>
      <CenterWrapper>
        <LoginFormWithMessage onSubmit={_handleSubmit} />
      </CenterWrapper>
    </CenterContainer>
  );

  function _handleSubmit(values: ILoginFormValues) {
    const { username, password, remember } = values;
    if (remember) {
      persistanceService.load('local');
    }

    login({ username, password });
  }
};

export default Login;
