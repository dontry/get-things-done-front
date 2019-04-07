import React from "react";
import { Layout } from "antd";
import Counter from "./components/_Counter";
import { observer } from "mobx-react";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import TaskEditor from "./components/Editor/TaskEditor";
import TaskBoard from "./view/TaskBoard";

const { Header, Content, Footer } = Layout;

const App: React.FC<any> = props => {
  const { match } = props;
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content>
          <Switch>
            <Route path={`${match.url}/board`} component={TaskBoard} />
            <Route path={`${match.url}/task`} component={TaskEditor} />
          </Switch>
        </Content>
        <Footer
          style={{ textAlign: "center" }}
        >{`GTD © ${new Date().getFullYear()} Created by Dontry`}</Footer>
      </Layout>
    </Layout>
  );
};

export default observer(App);
