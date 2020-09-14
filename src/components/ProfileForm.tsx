import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { merge } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { footerFormItemLayout, formItemLayout } from '../constants/layout';
import { IUser } from '../types';

const { Option } = Select;

interface IFormProps {
  user: IUser;
  onSubmit(user: IUser): void;
  onCancel(): void;
}

const ProfileForm = ({ user, onSubmit, onCancel: _onCancel }: IFormProps) => {
  const { username, email, fullName, age, sex } = user;
  const { firstName, lastName } = fullName || {};
  const { t } = useTranslation();

  const onFinish = useCallback(
    (values: any) => {
      const updatedUser = merge(user, values);
      onSubmit(updatedUser);
    },
    [user, onSubmit],
  );

  const onCancel = useCallback(() => {
    _onCancel();
  }, [_onCancel]);

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        {...formItemLayout}
        name='username'
        label={t('username.label')}
        initialValue={username}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item {...formItemLayout} name='email' label={t('email.label')} initialValue={email}>
        <Input disabled />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name={['fullName', 'firstName']}
        label={t('first_name.label')}
        initialValue={firstName}
        rules={[{ required: true, message: t('first_name.required') }]}
      >
        <Input type='string' />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name={['fullName', 'lastName']}
        label={t('last_name.label')}
        initialValue={lastName}
        rules={[{ required: true, message: t('last_name.required') }]}
      >
        <Input type='string' />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name='age'
        label={t('age.label')}
        initialValue={age}
        rules={[{ required: true, message: t('age.required') }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item {...formItemLayout} name='sex' label={t('sex')} initialValue={sex}>
        <Select>
          <Option value=''> </Option>
          <Option value='MALE'>{t('male')}</Option>
          <Option value='FEMALE'>{t('female')}</Option>
          <Option value='OTHER'>{t('other')}</Option>
        </Select>
      </Form.Item>
      <Form.Item {...footerFormItemLayout}>
        <Space>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            {t('save')}
          </Button>
          <Button type='default' htmlType='reset' className='login-form-button' onClick={onCancel}>
            {t('cancel')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
