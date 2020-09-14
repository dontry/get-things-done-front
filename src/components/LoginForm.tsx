import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
/* 
const footerFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    }
  }
};
 */
export interface ILoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

interface IFormProps {
  onSubmit(credential: ILoginFormValues): Promise<void>;
}

const LoginForm = ({ onSubmit }: IFormProps) => {
  const { t } = useTranslation();
  const onFinish = (values: any) => {
    const { username, password, remember } = values;
    onSubmit({ username, password, remember });
  };

  return (
    <Form onFinish={onFinish} className='login-form'>
      <Form.Item
        name='username'
        label={t('username.label')}
        rules={[{ required: true, message: t('username.label') }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder={t('username.label')}
        />
      </Form.Item>
      <Form.Item
        name='password'
        label={t('password.label')}
        rules={[{ required: true, message: t('password.required') }]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type='password'
          placeholder={t('password.label')}
        />
      </Form.Item>
      <Form.Item name='checked' initialValue='true'>
        <Checkbox>{t('remember_me')}</Checkbox>
        {/* TODO: forgot password */}
        {/* <a className='login-form-forgot' href="javascript:void(0)" > Forgot password </a> */}
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          {t('login')}
        </Button>
        <span style={{ marginLeft: 15 }}>
          <Link to='/register'>{t('register_now')}</Link>
        </span>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
