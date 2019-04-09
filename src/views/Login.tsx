import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import LoginForm from "../components/LoginForm";
import { AuthStore } from "@stores/authStore";

interface ILoginProps {
  authStore: AuthStore
}

const Login = inject("authStore")(observer(({ authStore }: ILoginProps) => <LoginForm onSubmit={authStore.verify} />))

export default Login;