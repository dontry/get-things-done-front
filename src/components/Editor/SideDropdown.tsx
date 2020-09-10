import { Button,Dropdown, Menu } from 'antd';
import React, { ReactNode } from 'react';

interface ISideDropdownProps {
  name: string;
  icon?: ReactNode;
  options: string[];
  onSelect(param: any): void;
}

const SideDropdown = ({ name, icon, options, onSelect }: ISideDropdownProps) => {
  const menu = renderMenu(options, onSelect);
  return (
    <Dropdown overlay={menu} placement={'bottomLeft'}>
      <Button>
        {icon} {name}
      </Button>
    </Dropdown>
  );
};

const renderMenu = (options: string[], onSelect: (param: any) => void) => (
  <Menu onSelect={onSelect}>
    {options.map(option => (
      <Menu.Item>{option}</Menu.Item>
    ))}
  </Menu>
);

export default SideDropdown;
