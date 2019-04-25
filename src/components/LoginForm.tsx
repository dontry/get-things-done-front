import React from "react";
import { FormComponentProps } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { ErrorStore } from "../stores/errorStore";
import { ErrorType } from "../types";

import { Form, Icon, Input, Button, Checkbox, message } from "antd";

interface IFormProps {
  errorStore: ErrorStore;
  onSubmit(credential: any): Promise<void>;
}

@inject("errorStore")
@observer
class RawLoginForm extends React.Component<IFormProps & FormComponentProps> {
  public render() {
    const { form, errorStore } = this.props
    const networkError = errorStore && errorStore.getError(ErrorType.NETWORK);
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this._handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">Register now!</Link>
        </Form.Item>
        {networkError && this._showMessage(networkError) }
      </Form>
    );
  }
  public _handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: any) => {
      if (!err) {
        const { username, password } = values;
        this.props.onSubmit({ username, password });
      }
    });
  };

  private _showMessage = (errorMessage: string): void => {
      message.error(errorMessage)
      this.props.errorStore.clearError(ErrorType.NETWORK)
  }
}

const LoginForm = Form.create()(RawLoginForm);

export default LoginForm;
