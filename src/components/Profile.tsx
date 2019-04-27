import React from "react";
import { FormComponentProps } from "antd/lib/form/Form";
import { IUser } from "../types";

import { Form, Icon, Input, Button, Checkbox, message } from "antd";

interface IFormProps {
  onSubmit(user: IUser): Promise<void>;
}

const PropfileForm = ({ onSubmit, form }: IFormProps & FormComponentProps) => {
  const { getFieldDecorator } = form;
  return null;
};
