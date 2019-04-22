import React from "react";
import ReactDOM from "react-dom";
// https://reacttraining.com/react-router/web/api/Router
import { Router, Switch, Route, Link } from "react-router-dom";
import { observer, Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import ProtectedRoute from "./components/ProtectedRoute";
import App from "./App";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import { setConfig } from "react-hot-loader";
import * as stores from "./stores";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "mobx-react-router";
import "./index.css";

const rootEl = document.getElementById("root");
setConfig({ ignoreSFC: true });
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);

(async () => {


  ReactDOM.render(
    <Provider {...stores}>
      <>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/home" component={App} />
            <Route path="/404" component={NotFound} />
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
