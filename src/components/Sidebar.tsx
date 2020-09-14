import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  InboxOutlined,
  StarOutlined,
  SelectOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  EnvironmentOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  RightSquareOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { useFetchProjects } from '../hooks/projectHooks';
import { IProject, IContext } from 'src/types';
import { useFetchContext } from '../hooks/contextHooks';
import { useTranslation } from 'react-i18next';
const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = useCallback(
    (_collapsed: boolean): void => {
      setCollapsed(_collapsed);
    },
    [setCollapsed],
  );
  const { t } = useTranslation();

  const { projects } = useFetchProjects();
  const { context } = useFetchContext();

  return (
    <Sider
      style={{ height: '100%', background: '#fff', overflow: 'auto' }}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
    >
      <Menu mode='inline' defaultSelectedKeys={['inbox']}>
        <Item key='inbox'>
          <Link to='/home/inbox'>
            <InboxOutlined />
            <span>{t('inbox')}</span>
          </Link>
        </Item>
        <Item key='today'>
          <Link to='/home/today'>
            <StarOutlined />
            <span>{t('today')}</span>
          </Link>
        </Item>
        <Item key='tomorrow'>
          <Link to='/home/tomorrow'>
            <RightSquareOutlined />
            <span>{t('tomorrow')}</span>
          </Link>
        </Item>
        <Item key='next'>
          <Link to='/home/next'>
            <SelectOutlined />
            <span>{t('next')}</span>
          </Link>
        </Item>
        <Item key='scheduled'>
          <Link to='/home/scheduled'>
            <ScheduleOutlined />
            <span>{t('scheduled')}</span>
          </Link>
        </Item>
        <Item key='someday'>
          <Link to='/home/someday'>
            <CalendarOutlined />
            <span>{t('someday')}</span>
          </Link>
        </Item>
        <Item key='note'>
          <Link to='/home/note'>
            <BookOutlined />
            <span>{t('notes')}</span>
          </Link>
        </Item>
        <SubMenu
          key='projects'
          title={
            <span>
              <FileDoneOutlined />
              <span>{t('projects')}</span>
            </span>
          }
        >
          {projects &&
            projects.map((project: IProject) => (
              <Item key={project.id}>
                <Link to={`/home/project/${project.id}`}>{project.title}</Link>
              </Item>
            ))}
        </SubMenu>
        <SubMenu
          key='context'
          title={
            <span>
              <EnvironmentOutlined />
              <span>{t('context')}</span>
            </span>
          }
        >
          {context &&
            context.map((cxt: IContext) => (
              <Item key={cxt.id}>
                <Link to={`/home/context/${cxt.id}`}>{cxt.name}</Link>
              </Item>
            ))}
        </SubMenu>
        <Item key='completed'>
          <Link to='/home/completed'>
            <CheckSquareOutlined />
            <span>{t('completed')}</span>
          </Link>
        </Item>
        <Item key='deleted'>
          <Link to='/home/deleted'>
            <DeleteOutlined />
            <span>{t('trash')}</span>
          </Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
