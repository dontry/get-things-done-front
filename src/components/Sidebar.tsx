import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  InboxOutlined,
  StarOutlined,
  SelectOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  RightSquareOutlined,
  BookOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const Sidebar: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const _handleCollapse = (_collapsed: boolean): void => {
    setCollapsed(_collapsed);
  };

  return (
    <Sider
      style={{ height: '100%', background: '#fff', overflow: 'auto' }}
      collapsible
      collapsed={collapsed}
      onCollapse={_handleCollapse}
    >
      <Menu mode='inline' defaultSelectedKeys={['inbox']}>
        <Item key='inbox'>
          <Link to='/home/inbox'>
            <InboxOutlined />
            <span>Inbox</span>
          </Link>
        </Item>
        <Item key='today'>
          <Link to='/home/today'>
            <StarOutlined />
            <span>Today</span>
          </Link>
        </Item>
        <Item key='tomorrow'>
          <Link to='/home/tomorrow'>
            <RightSquareOutlined />
            <span>Tomorrow</span>
          </Link>
        </Item>
        <Item key='next'>
          <Link to='/home/next'>
            <SelectOutlined />
            <span>Next</span>
          </Link>
        </Item>
        <Item key='scheduled'>
          <Link to='/home/scheduled'>
            <ScheduleOutlined />
            <span>Scheduled</span>
          </Link>
        </Item>
        <Item key='someday'>
          <Link to='/home/someday'>
            <CalendarOutlined />
            <span>Someday</span>
          </Link>
        </Item>
        <Item key='note'>
          <Link to='/home/note'>
            <BookOutlined />
            <span> Notes</span>
          </Link>
        </Item>
        <SubMenu
          key='projects'
          title={
            <span>
              <FileDoneOutlined />
              <span>Projects</span>
            </span>
          }
        >
          <Item>xx</Item>
          <Item>yy</Item>
        </SubMenu>
        <SubMenu
          key='goals'
          title={
            <span>
              <ExclamationCircleOutlined />
              <span>Goals</span>
            </span>
          }
        >
          <Item>goal1</Item>
          <Item>goal2</Item>
        </SubMenu>
        <SubMenu
          key='context'
          title={
            <span>
              <EnvironmentOutlined />
              <span>Context</span>
            </span>
          }
        >
          <Item>context1</Item>
        </SubMenu>
        <Item key='completed'>
          <Link to='/home/completed'>
            <CheckSquareOutlined />
            <span>Completed</span>
          </Link>
        </Item>
        <Item key='Trash'>
          <Link to='/home/deleted'>
            <DeleteOutlined />
            <span>Trash</span>
          </Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
