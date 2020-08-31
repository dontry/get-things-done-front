import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../constants/pathname';
import { persistanceService } from '../classes/PersistanceService';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const token = persistanceService.getItem('access_token');
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

export default ProtectedRoute;
