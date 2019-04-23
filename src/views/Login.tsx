import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import LoginForm from "../components/LoginForm";
import {login} from "../actions/authAction";


const Login = () => <LoginForm onSubmit={login} />

export default Login;