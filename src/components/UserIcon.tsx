import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown,Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../hooks/authHooks';
import routerStore from '../stores/routerStore';

const UserIcon = () => (
    <Dropdown overlay={menu}>
      <Avatar size='large' icon={<UserOutlined />} />
    </Dropdown>
  );

const menu = (() => {
  const handleLogout = () => {
    logout();
    routerStore.push('/login');
  };
  return (
    <Menu>
      <Menu.Item>
        <Link to='/home/inbox'>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/profile'>Profile</Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
})();

export default UserIcon;
