import React from "react";
import { Layout } from "antd";
import Counter from "./components/_Counter";
import { observer } from "mobx-react";
import Sidebar from "./components/Sidebar";
import "./App.css";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => (
  <Layout style={{ height: "100vh" }}>
    <Sidebar />
    <Layout>
      <Content />
      <Footer
        style={{ textAlign: "center" }}
      >{`GTD © ${new Date().getFullYear()} Created by Dontry`}</Footer>
    </Layout>
  </Layout>
);

export default observer(App);
