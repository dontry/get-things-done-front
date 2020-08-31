import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Button, Checkbox } from 'antd';
import Icon from '@ant-design/icons';

const footerFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    }
  }
};

export interface ILoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

interface IFormProps {
  onSubmit(credential: ILoginFormValues): Promise<void>;
}

const LoginForm = ({ onSubmit }: IFormProps) => {
  const handleFinish = (values: any) => {
    const { username, password, remember } = values;
    onSubmit({ username, password, remember });
  };

  return (
    <Form onFinish={handleFinish} className='login-form'>
      <Form.Item
        name='username'
        label='Username'
        rules={[
          { required: true, message: 'Please input your username!' }
        ]}
      >
        <Input
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        label='Password'
        rules={[
          { required: true, message: 'Please input your Password!' }
        ]}
      >
        <Input
          prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item name='checked' initialValue='true' >
        <Checkbox>Remember me</Checkbox>
        <a className='login-form-forgot' href=''> Forgot password </a>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
        <span style={{ marginLeft: 15 }}>Or</span> <Link to='/register'>Register now!</Link>
      </Form.Item>
    </Form>
  );

}


export default LoginForm;
