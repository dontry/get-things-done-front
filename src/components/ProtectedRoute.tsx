import React from "react";
import { Route, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { AuthStore } from "../stores/authStore";
import { LOGIN } from "../constants/pathname";

interface Props {
  authState: AuthStore;
}

// FIXIT: prop-types
const ProtectedRoute: React.SFC<Props> = ({
  component: Component,
  authState,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={props =>
        authState.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: LOGIN, state: { from: props.location } }} />
        )
      }
    />
  );
};

export default inject("authStore")(
  observer(({ authStore }) => <ProtectedRoute authState={authStore} />)
);
