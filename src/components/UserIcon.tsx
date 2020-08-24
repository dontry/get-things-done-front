import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authAction';
import routerStore from '../stores/routerStore';
import { Avatar, Menu, Dropdown, Icon } from 'antd';

const UserIcon = () => {
  return (
    <Dropdown overlay={menu}>
      <Avatar size='large' icon='user' />
    </Dropdown>
  );
};

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
