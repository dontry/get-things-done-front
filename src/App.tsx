import React from "react";
import { Layout, Avatar } from "antd";
import { observer } from "mobx-react";
import Sidebar from "./components/Sidebar";
import UserIcon from "./components/UserIcon";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import TaskEditor from "./components/Editor/TaskEditor";
import TaskBoard from "./views/TaskBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import WithMessagePopup from "./components/WithMessagePopup";
import { MessageType } from "./types";

const { Header, Content, Footer } = Layout;

const App: React.FC<any> = props => {
  const { match } = props;
  const TaskboardWithMessage = WithMessagePopup(TaskBoard, MessageType.NETWORK);
  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <UserIcon />
      </Header>
      <Layout>
        <Sidebar />
        <Layout>
          <Content>
            <Switch>
              <ProtectedRoute path={`${match.url}/:type`} component={TaskboardWithMessage} />
              <ProtectedRoute path={`${match.url}/:type/editor`} component={TaskboardWithMessage} />
            </Switch>
          </Content>
          <Footer
            style={{ textAlign: "center", height: "48px", padding: "14px 50px" }}
          >{`GTD © ${new Date().getFullYear()} Created by Dontry`}</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(App);
