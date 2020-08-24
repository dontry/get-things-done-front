import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
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
            <Icon type='inbox' />
            <span>Inbox</span>
          </Link>
        </Item>
        <Item key='today'>
          <Link to='/home/today'>
            <Icon type='star' />
            <span>Today</span>
          </Link>
        </Item>
        <Item key='next'>
          <Link to='/home/next'>
            <Icon type='select' />
            <span>Next</span>
          </Link>
        </Item>
        {/* <Item key='tomorrow'>
          <Icon type='' />
          Tomorrow
        </Item> */}
        <Item key='scheduled'>
          <Link to='/home/scheduled'>
            <Icon type='schedule' />
            <span>Scheduled</span>
          </Link>
        </Item>
        <Item key='someday'>
          <Link to='/home/someday'>
            <Icon type='calendar' />
            <span>Someday</span>
          </Link>
        </Item>
        <Item key='references'>
          <Link to='/home/references'>
            <Icon type='database' />
            <span> References</span>
          </Link>
        </Item>
        <SubMenu
          key='projects'
          title={
            <span>
              <Icon type='file-done' />
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
              <Icon type='exclamation-circle' />
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
              <Icon type='environment' /> <span>Context</span>
            </span>
          }
        >
          <Item>context1</Item>
        </SubMenu>
        <Item key='completed'>
          <Link to='/home/completed'>
            <Icon type='check-square' />
            <span>Completed</span>
          </Link>
        </Item>
        <Item key='Trash'>
          <Link to='/home/deleted'>
            <Icon type='delete' />
            <span>Trash</span>
          </Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
