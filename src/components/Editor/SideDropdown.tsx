import React, { ReactNode } from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { SelectParam } from 'antd/lib/menu';

interface ISideDropdownProps {
  name: string;
  icon?: ReactNode;
  options: string[];
  onSelect(param: SelectParam): void;
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

const renderMenu = (options: string[], onSelect: (param: SelectParam) => void) => (
  <Menu onSelect={onSelect}>
    {options.map(option => (
      <Menu.Item>{option}</Menu.Item>
    ))}
  </Menu>
);

export default SideDropdown;
