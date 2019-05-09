import React from "react";
import styled from "styled-components";
import { Layout, Form, Input, Button } from "antd";

const AddButton = styled(Button)`
  font-size: 14px;
  width: 100%;
  height: calc(100% - 1px) !important;
  border: none !important;
  background-color: transparent !important;
`;
const StyledInput = styled(Input)`
  .ant-input-group-addon {
    padding: 0;
  }
`;

interface ITaskInputProps {
  value: string;
  onSubmit(e: React.SyntheticEvent): void;
  onChange(e: React.SyntheticEvent<HTMLInputElement>): void;
}

const TaskInput = ({ onSubmit, onChange, value }: ITaskInputProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Layout style={{ backgroundColor: "#fff" }}>
        <Form.Item style={{ margin: "16px 8px" }}>
          <StyledInput
            value={value}
            placeholder="Add a new task"
            onChange={onChange}
            addonAfter={<AddButton onClick={onSubmit}>+</AddButton>}
          />
        </Form.Item>
      </Layout>
    </Form>
  );
};

export default TaskInput;
