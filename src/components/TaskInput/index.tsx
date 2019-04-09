import React from "react"
import { Layout,Form, Input } from "antd";

interface ITaskInputProps {
    value: string;
    onSubmit(e: React.SyntheticEvent): void;
    onChange(e: React.SyntheticEvent<HTMLInputElement>): void;
}

const TaskInput = ({onSubmit, onChange, value}: ITaskInputProps) => {
  return (
       <Form onSubmit={onSubmit}>
        <Layout style={{backgroundColor: "#fff"}}>
          <Form.Item style={{margin: "16px 8px"}}>
            <Input value={value} placeholder="Add a new task" onChange={onChange}/>
          </Form.Item>
        </Layout>
      </Form>
  )
}

export default TaskInput;
