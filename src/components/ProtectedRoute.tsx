import React from "react";
import { Route, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { LOGIN } from "../constants/pathname";
import _ from "lodash";

/* interface IProtectedRouteProps {
  authenticated: boolean;
} */

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: LOGIN, state: { from: props.location } }} />
        )
      }
    />
  );
};

/*  
inject("userStore")(
  observer(({ userStore, ...rest }) => {
    return <ProtectedRoute authenticated={} {...rest} />;
  })
); 
*/

export default ProtectedRoute;
