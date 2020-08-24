import React, { useState } from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { IUser } from '../types';
import { formItemLayout, footerFormItemLayout } from '../constants/layout';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

interface IFormProps {
  user: IUser;
  onSubmit(user: any): Promise<void>;
}

const RawProfileForm: React.FC<IFormProps & FormComponentProps> = props => {
  const { user, onSubmit, form } = props;
  const { getFieldDecorator } = form;
  const { username, email, fullName, age, sex } = user;
  const { firstName, lastName } = fullName;
  const [confirmDirty, setConfirmDirty] = useState(false);

  return (
    <Form onSubmit={_handleSubmit}>
      <Form.Item {...formItemLayout} label='Username'>
        <Input disabled value={username} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='E-mail'>
        <Input disabled value={email} />
      </Form.Item>
      <Form.Item {...formItemLayout} label='First Name'>
        {getFieldDecorator('firstName', {
          initialValue: firstName,
          rules: [{ required: true, message: 'Input your first name.' }]
        })(<Input type='string' />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label='Last Name'>
        {getFieldDecorator('lastName', {
          initialValue: lastName,
          rules: [{ required: true, message: 'Input your last name.' }]
        })(<Input type='string' />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label='Age'>
        {getFieldDecorator('age', {
          initialValue: age,
          rules: [
            { required: true, message: 'Input your age.' },
            {
              validator: _validateAge
            }
          ]
        })(<Input type='number' />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label='Sex'>
        {getFieldDecorator('sex', {
          initialValue: sex
        })(
          <Select>
            <Option value='' />
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
            <Option value='other'>Other</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item {...footerFormItemLayout}>
        <Button type='default' htmlType='reset' className='login-form-button'>
          Cancel
        </Button>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Update
        </Button>
      </Form.Item>
    </Form>
  );

  function _handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    form.validateFields((err, values: []) => {
      onSubmit(values);
    });
  }

  function _handleConfirmBlur(e: React.SyntheticEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    setConfirmDirty(confirmDirty || !!value);
  }

  function _validateAge(rule: any, value: number, callback: (s?: string) => void): void {
    if (value < 0) {
      callback('Age value should be positive.');
    } else {
      callback();
    }
  }

  function _validateName(rule: any, value: number, callback: (s?: string) => void): void {
    if (value < 0) {
      callback('Age value should be positive.');
    } else {
      callback();
    }
  }
};

const ProfileForm = Form.create()(RawProfileForm);

export default ProfileForm;
