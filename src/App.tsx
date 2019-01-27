import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

type Props = { message?: string };

const App: React.FunctionComponent<Props> = ({ message }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>{message}</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default App;
