import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Layout, Form, Input, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';

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
  onCreateTask(title: string): void;
}

export const TaskInput = ({ onCreateTask }: ITaskInputProps) => {
  const [form] = useForm();

  const onFinish = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        onCreateTask(values.title);
      })
      .finally(() => {
        form.resetFields();
      });
  }, [onCreateTask]);

  return (
    <Form onFinish={onFinish} form={form}>
      <Layout style={{ backgroundColor: '#fff' }}>
        <Form.Item name='title' style={{ margin: '16px 8px' }}>
          <StyledInput
            placeholder='Add a new task'
            // onKeyPress={onKeyPress}
            addonAfter={<AddButton onClick={onFinish}>+</AddButton>}
          />
        </Form.Item>
      </Layout>
    </Form>
  );
};

export default inject('userStore')(
  observer(({ userStore, ...rest }) => {
    return <TaskInput userId={userStore.userId} {...rest} />;
  })
);
