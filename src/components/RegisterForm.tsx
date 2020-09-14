import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { footerFormItemLayout, formItemLayout } from '../constants/layout';
const { Option } = Select;

interface IFormProps {
  onSubmit(user: any): Promise<void>;
}

// https://ant.design/components/form/?locale=en-US#components-form-demo-register
const RegisterForm = ({ onSubmit }: IFormProps) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [form] = useForm();
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  const onConfirmBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule: any, value: string) => {
    if (value && value !== form.getFieldValue('password')) {
      throw new Error(t('confirm_password.invalid'));
    }
  };

  const validateAge = (rule: any, value: number) => {
    if (value < 18) {
      throw new Error(t('age.in valid'));
    }
  };

  const validateToNextPassword = (rule: any, value: string, callback: (s?: string) => void) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    callback();
  };

  return (
    <Form onFinish={onFinish} className='login-form'>
      <Form.Item
        {...formItemLayout}
        name='username'
        label={t('username.label')}
        rules={[{ required: true, message: t('username.required') }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={t('username.label')}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name='email'
        label={t('email.label')}
        rules={[
          { type: 'email', message: t('email.invalid') },
          { required: true, message: t('email.required') },
        ]}
      >
        <Input placeholder='john.doe@xmail.com' />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name='password'
        label={t('password.label')}
        rules={[
          { required: true, message: t('password.required') },
          { validator: validateToNextPassword },
        ]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type='password'
          onBlur={onConfirmBlur}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name='confirm'
        label={t('confirm_password.label')}
        rules={[
          { required: true, message: t('confirm_password.required') },
          { validator: compareToFirstPassword },
        ]}
      >
        <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name='age'
        label={t('age.label')}
        rules={[{ required: true, message: t('age.required') }, { validator: validateAge }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item {...formItemLayout} name='sex' label={t('sex')} initialValue=''>
        <Select>
          <Option value=''>''</Option>
          <Option value='MALE'>Male</Option>
          <Option value='FEMALE'>Female</Option>
          <Option value='OTHER'>Other</Option>
        </Select>
      </Form.Item>
      <Form.Item {...footerFormItemLayout}>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          {t('register')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
