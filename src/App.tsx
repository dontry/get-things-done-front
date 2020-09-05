import React from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react';
import Sidebar from './components/Sidebar';
import UserIcon from './components/UserIcon';
import { Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import WithMessagePopup from './components/WithMessagePopup';
import { MessageType } from './types';
import { ReactQueryDevtools } from 'react-query-devtools';
import './App.css';
import { ReactQueryConfigProvider } from 'react-query';
import TaskEditor from './components/Editor/TaskEditor';
import AddButton from './components/AddButton';
import CategoryTaskBoard from './views/CategoryTaskBoard';
import ContextTaskBoard from './views/ContextTaskBoard';
import ProjectBoard from './views/ProjectBoard';

const { Header, Content, Footer } = Layout;

const queryConfig = { queries: { refetchOnWindowFocus: false } };

const App: React.FC<any> = props => {
  const { match } = props;
  const CategoryTaskboardWithMessagePopup = WithMessagePopup(
    CategoryTaskBoard,
    MessageType.NETWORK
  );
  const ContextTaskboardWithMessagePopup = WithMessagePopup(ContextTaskBoard, MessageType.NETWORK);
  const TaskEditorWithMessagePopup = WithMessagePopup(TaskEditor, MessageType.NETWORK);
  const ProjectBoardWithMessagePopup = WithMessagePopup(ProjectBoard, MessageType.NETWORK);

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Layout style={{ height: '100vh' }}>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <UserIcon />
          <AddButton />
        </Header>
        <Layout>
          <Sidebar />
          <Layout>
            <Content>
              <Switch>
                <ProtectedRoute
                  exact
                  path={`${match.url}/task/:id`}
                  component={TaskEditorWithMessagePopup}
                />
                <ProtectedRoute
                  exact
                  path={`${match.url}/project/:id`}
                  component={ProjectBoardWithMessagePopup}
                />
                <ProtectedRoute
                  exact
                  path={`${match.url}/context/:id`}
                  component={ContextTaskboardWithMessagePopup}
                />
                <ProtectedRoute
                  exact
                  path={`${match.url}/:type`}
                  component={CategoryTaskboardWithMessagePopup}
                />
              </Switch>
            </Content>
            <Footer
              style={{ textAlign: 'center', height: '48px', padding: '14px 50px' }}
            >{`GTD © ${new Date().getFullYear()} Created by Dontry`}</Footer>
          </Layout>
        </Layout>
      </Layout>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryConfigProvider>
  );
};

export default observer(App);
