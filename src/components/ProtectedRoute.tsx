import React from 'react';
import { Redirect,Route } from 'react-router-dom';

import { persistanceService } from '../classes/PersistanceService';
import { LOGIN } from '../constants/pathname';

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
