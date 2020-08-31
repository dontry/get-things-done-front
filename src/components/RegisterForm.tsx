import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { formItemLayout, footerFormItemLayout } from '../constants/layout';
import { useForm } from 'antd/lib/form/Form';
const { Option } = Select;

interface IFormProps {
  onSubmit(user: any): Promise<void>;
}

// https://ant.design/components/form/?locale=en-US#components-form-demo-register
const RegisterForm = ({ onSubmit }: IFormProps) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [form] = useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  const handleConfirmBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule: any, value: string) => {
    if (value && value !== form.getFieldValue('password')) {
      throw new Error('The password you entered is not the same.');
    }
  };

  const validateAge = (rule: any, value: number) => {
    if (value < 18) {
      throw new Error('Your age should not be under 18.');
    }
  };

  const validateToNextPassword = (rule: any, value: string, callback: (s?: string) => void) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    callback();
  };

  return (
    <Form onFinish={handleFinish} className='login-form'>
      <Form.Item {...formItemLayout}
        name='username'
        label='Username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item {...formItemLayout}
        name='email'
        label='E-mail'
        rules={[
          { type: 'email', message: 'The input is not a valid E-mail.' },
          { required: true, message: 'Please input your E-mail.' }
        ]}
      >
        <Input placeholder='john.doe@xmail.com' />
      </Form.Item>
      <Form.Item {...formItemLayout}
        name='password'
        label='Password'
        rules={[
          { required: true, message: 'Please input your Password!' },
          { validator: validateToNextPassword }
        ]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type='password'
          onBlur={handleConfirmBlur}
        />
      </Form.Item>
      <Form.Item {...formItemLayout}
        name='confirm'
        label='Confirm Password'
        rules={[
          { required: true, message: 'Please confirm your Password!' },
          { validator: compareToFirstPassword }
        ]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type='password'
        />
      </Form.Item>
      <Form.Item {...formItemLayout}
        name='age'
        label='Age'
        rules={[
          { required: true, message: 'Input your age.' },
          { validator: validateAge }
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item {...formItemLayout}
        name='sex'
        label='Sex'
        initialValue=''
      >
        <Select>
          <Option value='' >''</Option>
          <Option value='MALE'>Male</Option>
          <Option value='FEMALE'>Female</Option>
          <Option value='OTHER'>Other</Option>
        </Select>
      </Form.Item>
      <Form.Item {...footerFormItemLayout}>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
