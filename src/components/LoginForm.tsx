import React from "react";
import { FormComponentProps } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";

interface FormProps {
  onSubmit(): void;
}

class RawLoginForm extends React.Component<FormProps & FormComponentProps> {
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: []) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    this.props.onSubmit();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("userName", {
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">Register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create()(RawLoginForm);

export default LoginForm;
