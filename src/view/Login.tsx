import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { AuthStore } from "../stores/authStore";
import LoginForm from "../components/LoginForm";

interface Props {
  authenticated: boolean;
  verify(): void;
}

const Login: React.FC<Props> = ({ verify, authenticated }) => (
  <LoginForm onSubmit={verify} />
);

export default inject("authStore")(
  observer(({ authStore }) => (
    <Login
      authenticated={authStore.authenticated}
      verify={() => authStore.verify()}
    />
  ))
);
