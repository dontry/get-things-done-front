import './index.css';

import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { default as MobxDevTools } from 'mobx-react-devtools';
import { syncHistoryWithStore } from 'mobx-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { setConfig } from 'react-hot-loader';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import './i18n';

import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import { HOME, LOGIN, PROFILE, REGISTER } from './constants/pathname';
import * as serviceWorker from './serviceWorker';
import * as stores from './stores';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Profile from './views/Profile';
import Register from './views/Register';

const rootEl = document.getElementById('root');
setConfig({ ignoreSFC: true });
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);
const queryConfig = { queries: { refetchOnWindowFocus: true } };

(async () => {
  ReactDOM.render(
    <Provider {...stores}>
      <ReactQueryConfigProvider config={queryConfig}>
        <Router history={history}>
          <Switch>
            <Redirect key='root' exact path='/' to={HOME} />
            <Route key='login' exact path={LOGIN} component={Login} />
            <Route key='register' exact path={REGISTER} component={Register} />
            <ProtectedRoute key='home' path={HOME} component={App} />
            <ProtectedRoute key='profile' path={PROFILE} component={Profile} />
            <Route key='not-found' path='/404' component={NotFound} />
            <Route key='default' path='*' component={NotFound} />
          </Switch>
        </Router>
        {process.env.NODE_ENV !== 'production' && (
          <>
            <MobxDevTools />
            <ReactQueryDevtools initialIsOpen />
          </>
        )}
      </ReactQueryConfigProvider>
    </Provider>,
    rootEl,
  );
})();

if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
