import React, { useCallback, useState, useEffect } from 'react';
import { Button, Menu, Dropdown, Form, Modal, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { useCreateProject } from '../hooks/projectHooks';
import { Project, Context } from '../classes';
import { useCreateContext } from '../hooks/contexHooks';

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
  }, [isSuccess]);

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
  }, [isSuccess]);

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
