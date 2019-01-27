import React from "react";
import logo from "./logo.svg";
import Counter from "./components/counter";
import "./App.css";
import { setConfig } from "react-hot-loader";

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
    </main>
  </div>
);

export default App;
