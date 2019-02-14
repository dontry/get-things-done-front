import React from "react";
import logo from "./logo.svg";
import Counter from "./components/counter";
import "./App.css";
import { setConfig } from "react-hot-loader";
import MobxReactDevtools from "mobx-react-devtools";
import { FieldInput, FieldState } from "./components/FieldInput";
import { appState } from "./AppState";
import { observer } from "mobx-react";

setConfig({ ignoreSFC: true });

type Props = { message: string };

const App: React.FC<Props> = ({ message }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h3>{message}</h3>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
    <main>
      <Counter />
      <br />
      <FieldInput fieldState={appState.currentItem} />
      <button onClick={appState.addCurrentItem}>Add Item</button>
      <ul>
        {appState.items.map((item: string) => (
          <li>{item}</li>
        ))}
      </ul>
      <MobxReactDevtools />
    </main>
  </div>
);

export default observer(App);
