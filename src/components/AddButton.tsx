import React, { useCallback } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const AddButton = () => {
  const handleMenuClick = useCallback(
    (e) => {
      console.log('click', e);
    }, [])

  return (
    <>
      <Dropdown overlay={<AddButtonMenu handleMenuClick={handleMenuClick} />}>
        <Button>
          <PlusCircleOutlined /> Add
        </Button>
      </Dropdown>
    </>
  )
}


const AddButtonMenu = ({ handleMenuClick }: { handleMenuClick: any }) => (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='project'>Project</Menu.Item>
    <Menu.Item key='context'>Context</Menu.Item>
  </Menu>
);

export default AddButton;