import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { ErrorStore } from "../stores/errorStore";
import LoginForm from "../components/LoginForm";
import {login} from "../actions/authAction";


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Wrapper = styled.div`
   min-width: 300px;
    max-width: 500px;
    width: 50vh;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 16px 32px;
`


const Login = ({errorStore}: {errorStore: ErrorStore}) =>  <Container><Wrapper><LoginForm errorStore={errorStore} onSubmit={login} /></Wrapper></Container>

export default inject("errorStore")(observer(({errorStore}) => <Login errorStore={errorStore} />));