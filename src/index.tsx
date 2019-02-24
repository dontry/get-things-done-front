import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { observer, Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import ProtectedRoute from "./components/ProtectedRoute";
import Counter from "./components/_Counter";
import Login from "./view/Login";
import Register from "./view/Register";
import NotFound from "./view/NotFound";
import { setConfig } from "react-hot-loader";
import * as stores from "./stores";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

const rootEl = document.getElementById("root");
setConfig({ ignoreSFC: true });

ReactDOM.render(
  <Provider {...stores}>
    <>
      <Router>
        <Switch>
          <ProtectedRoute path="/counter" component={Counter} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      {process.env.NODE_ENV !== "production" && <DevTools />}
    </>
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
