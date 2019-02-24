import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { AuthStore } from "../stores/authStore";

interface Props {
  authenticated: boolean;
  verify(): void;
}

const Login: React.FC<Props> = ({ verify, authenticated }) => (
  <div>
    <button onClick={verify}>Login</button>
    {authenticated ? <span>Logged in</span> : "log out"}
    <Link to="/counter">Counter</Link>
  </div>
);

export default inject("authStore")(
  observer(({ authStore }) => (
    <Login
      authenticated={authStore.authenticated}
      verify={() => authStore.verify()}
    />
  ))
);
