import React from 'react';

import { persistanceService } from '../classes/PersistanceService';
import LoginForm, { ILoginFormValues } from '../components/LoginForm';
import WithMessagePopup from '../components/WithMessagePopup';
import { login } from '../hooks/authHooks';
import { MessageType } from '../types';
import { CenterContainer, CenterWrapper } from './style';

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
