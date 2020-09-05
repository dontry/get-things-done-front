import React from 'react';
import { IUser } from '../types';
import { formItemLayout, footerFormItemLayout } from '../constants/layout';
import { Form, Input, Button, Select, InputNumber, Space } from 'antd';
import { merge } from 'lodash';

const { Option } = Select;

interface IFormProps {
  user: IUser;
  onSubmit(user: IUser): void;
  onCancel(): void;
}

const ProfileForm = ({ user, onSubmit, onCancel }: IFormProps) => {
  const { username, email, fullName, age, sex } = user;
  const { firstName, lastName } = fullName || {};

  const handleFinish = (values: any) => {
    const updatedUser = merge(user, values);
    onSubmit(updatedUser);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Form onFinish={handleFinish}>
      <Form.Item {...formItemLayout} name='username' label='Username' initialValue={username}>
        <Input disabled />
      </Form.Item>
      <Form.Item {...formItemLayout} name='email' label='E-mail' initialValue={email}>
        <Input disabled />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name={['fullName', 'firstName']}
        label='First Name'
        initialValue={firstName}
        rules={[{ required: true, message: 'Input your first name.' }]}
      >
        <Input type='string' />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name={['fullName', 'lastName']}
        label='Last Name'
        initialValue={lastName}
        rules={[{ required: true, message: 'Input your last name.' }]}
      >
        <Input type='string' />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name='age'
        label='Age'
        initialValue={age}
        rules={[{ required: true, message: 'Input your age.' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item {...formItemLayout} name='sex' label='Sex' initialValue={sex}>
        <Select>
          <Option value=''> </Option>
          <Option value='MALE'>Male</Option>
          <Option value='FEMALE'>Female</Option>
          <Option value='OTHER'>Other</Option>
        </Select>
      </Form.Item>
      <Form.Item {...footerFormItemLayout}>
        <Space>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Save
          </Button>
          <Button type='default' htmlType='reset' className='login-form-button' onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
