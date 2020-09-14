import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { logout } from '../hooks/authHooks';
import routerStore from '../stores/routerStore';

const UserIcon = () => {
  const onLogout = () => {
    logout();
    routerStore.push('/login');
  };

  return (
    <Dropdown overlay={<UserMenu onClick={onLogout} />}>
      <Avatar size='large' icon={<UserOutlined />} />
    </Dropdown>
  );
};

interface IUserMenuProps {
  onClick(): void;
}

const UserMenu = ({ onClick }: IUserMenuProps) => {
  const { t } = useTranslation();

  return (
    <Menu>
      <Menu.Item>
        <Link to='/home/inbox'>{t('home')}</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/profile'>{t('profile')}</Link>
      </Menu.Item>
      <Menu.Item onClick={onClick}>
        <span>{t('logout')}</span>
      </Menu.Item>
    </Menu>
  );
};

export default UserIcon;
