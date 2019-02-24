import React from "react";
import { Route, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { AuthStore } from "../stores/authStore";
import { LOGIN } from "../constants/pathname";

interface Props {
  authenticated: boolean;
}

const ProtectedRoute: React.SFC<Props> = ({
  component: Component,
  authenticated,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: LOGIN, state: { from: props.location } }} />
        )
      }
    />
  );
};

export default inject("authStore")(
  observer(({ authStore, ...rest }) => {
    console.log(authStore.authenticated);
    return <ProtectedRoute authenticated={authStore.authenticated} {...rest} />;
  })
);
