import React from 'react';
import ReactDOM from 'react-dom';
// https://reacttraining.com/react-router/web/api/Router
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { default as MobxDevTools } from 'mobx-react-devtools';
import ProtectedRoute from './components/ProtectedRoute';
import App from './App';
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';
import Profile from './views/Profile';
import { setConfig } from 'react-hot-loader';
import * as stores from './stores';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import './index.css';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { LOGIN, REGISTER, HOME, PROFILE } from './constants/pathname';

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
            <Redirect exact path='/' to={HOME} />
            <Route exact path={LOGIN} component={Login} />
            <Route exact path={REGISTER} component={Register} />
            <ProtectedRoute path={HOME} component={App} />
            <ProtectedRoute path={PROFILE} component={Profile} />
            <Route path='/404' component={NotFound} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
        {process.env.NODE_ENV !== 'production' &&
          <>
            <MobxDevTools />
            <ReactQueryDevtools initialIsOpen />
          </>}
      </ReactQueryConfigProvider>
    </Provider>,
    rootEl
  );
})();

if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
