import React from "react";
import { observer, inject } from "mobx-react";
import { AuthStore } from "../stores/authStore";

interface Props {
  authState: AuthStore;
}

const Login: React.FC<Props> = ({ authState }) => (
  <div>
    <button onClick={() => authState.verify()}>Login</button>
  </div>
);

export default inject("authStore")(
  observer(({ authStore }) => <Login authState={authStore} />)
);
