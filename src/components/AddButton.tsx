import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Input,Menu, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback, useEffect,useState } from 'react';

import { Context,Project } from '../classes';
import { useCreateContext } from '../hooks/contextHooks';
import { useCreateProject } from '../hooks/projectHooks';

const AddButton = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const handleMenuClick = useCallback(
    e => {
      setSelectedOption(e.key);
    },
    [setSelectedOption]
  );

  const onClose = useCallback(() => {
    setSelectedOption('');
  }, [setSelectedOption]);

  return (
    <>
      <Dropdown overlay={<AddButtonMenu handleMenuClick={handleMenuClick} />}>
        <Button>
          <PlusCircleOutlined /> Add
        </Button>
      </Dropdown>
      <ContextModal visible={selectedOption === 'context'} onClose={onClose} />
      <ProjectModal visible={selectedOption === 'project'} onClose={onClose} />
    </>
  );
};

const AddButtonMenu = ({ handleMenuClick }: { handleMenuClick: any }) => (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='project'>Project</Menu.Item>
    <Menu.Item key='context'>Context</Menu.Item>
  </Menu>
);

interface IModalProps {
  visible: boolean;
  onClose(): void;
}

const ContextModal = ({ visible, onClose }: IModalProps) => {
  const [form] = useForm();
  const { createContext, isSuccess } = useCreateContext();

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      onClose();
    }
  }, [isSuccess, form, onClose]);

  const onOk = useCallback(() => {
    form.validateFields().then(values => {
      const context = new Context(values.name);
      createContext({ context: context.toJson() });
    });
  }, [form, createContext]);

  return (
    <Modal title='New context' visible={visible} onOk={onOk} onCancel={onClose} okText='Add'>
      <Form form={form}>
        <Form.Item
          name='name'
          label='Context'
          rules={[{ required: true, message: 'Please enter context name' }]}
        >
          <Input placeholder='Please enter context name' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ProjectModal = ({ visible, onClose }: IModalProps) => {
  const [form] = useForm();
  const { createProject, isSuccess } = useCreateProject();

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      onClose();
    }
  }, [isSuccess, form, onClose]);

  const onOk = useCallback(() => {
    form.validateFields().then(values => {
      const project = new Project({ title: values.title });
      createProject({ project: project.toJson() });
    });
  }, [form, createProject]);

  return (
    <Modal title='New project' visible={visible} onOk={onOk} onCancel={onClose} okText='Add'>
      <Form form={form}>
        <Form.Item
          name='title'
          label='Title'
          rules={[{ required: true, message: 'Please enter new project title' }]}
        >
          <Input placeholder='Enter project title' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddButton;
