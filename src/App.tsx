import React from "react";
import { Layout } from "antd";
import { observer } from "mobx-react";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import TaskEditor from "./components/Editor/TaskEditor";
import TaskBoard from "./views/TaskBoard";
import ProtectedRoute from "./components/ProtectedRoute";

const { Header, Content, Footer } = Layout;

const App: React.FC<any> = props => {
  const { match } = props;
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content>
          <Switch>
            <ProtectedRoute path={`${match.url}/:type`} component={TaskBoard} />
            <ProtectedRoute path={`${match.url}/:type/editor`} component={TaskEditor} />
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
