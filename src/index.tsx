import React from "react";
import ReactDOM from "react-dom";
// https://reacttraining.com/react-router/web/api/Router
import { Router, Switch, Route, Link } from "react-router-dom";
import { observer, Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import ProtectedRoute from "./components/ProtectedRoute";
import Counter from "./components/_Counter";
import App from "./App";
import Login from "./view/Login";
import Register from "./view/Register";
import NotFound from "./view/NotFound";
import { setConfig } from "react-hot-loader";
import appStore from "./stores";
import * as serviceWorker from "./serviceWorker";
import { create, persist } from "mobx-persist";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "mobx-react-router";
import "./index.css";

const rootEl = document.getElementById("root");
setConfig({ ignoreSFC: true });
const hydrate = create({ jasonify: false });
const initialStore = (window as any).__INITIAL_STATE__ && (window as any).__INITIAL_STATE__.app;

const browserHistory = createBrowserHistory();

(async () => {
  await hydrate("appState", appStore, initialStore).then(() => {
    console.log("rehydrate");
    console.log(appStore.auth.authenticated);
  });

  const history = syncHistoryWithStore(browserHistory, appStore.router);

  ReactDOM.render(
    <Provider {...appStore.getAllState()}>
      <>
        <Router history={history}>
          <Switch>
            <ProtectedRoute path="/counter" component={Counter} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/" component={App} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
        {process.env.NODE_ENV !== "production" && <DevTools />}
      </>
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
