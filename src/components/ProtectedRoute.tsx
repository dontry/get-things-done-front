import React from "react";
import { Route, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { LOGIN } from "../constants/pathname";
import _ from "lodash";

interface IProtectedRouteProps {
  authenticated: boolean;
}

const ProtectedRoute: React.SFC<IProtectedRouteProps> = ({
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

export default inject("userStore")(
  observer(({ userStore, ...rest }) => {
    return <ProtectedRoute authenticated={userStore.authenticated} {...rest} />;
  })
);
