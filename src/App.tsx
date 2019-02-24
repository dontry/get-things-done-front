import React from "react";
import Counter from "./components/counter";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { setConfig } from "react-hot-loader";
import MobxReactDevtools from "mobx-react-devtools";
import { FieldInput, FieldState } from "./components/FieldInput";
import { appState } from "./AppState";
import { observer } from "mobx-react";

setConfig({ ignoreSFC: true });

type Props = { message: string };

const App: React.FC<Props> = ({ message }) => (
  <Router>
    <Route exact path="/" component={Counter} />
  </Router>
);

export default observer(App);
