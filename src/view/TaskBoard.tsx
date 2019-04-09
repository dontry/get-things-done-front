import React, {useState} from "react"
import { RouteComponentProps } from "react-router";
import { Layout,Form, Input } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../components/TaskList/TaskList";
import { mockData } from "../components/TaskList/mockData";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  height: 100%;
`;

interface ITaskList {
  id: string;
  title: string;
  taskIds: string[];
}


const useTaskList =(initialList: string[]) => {
  const [list, setList] = useState(initialList);
  return {list, setList}
}


const TaskBoard  = ({ location }: RouteComponentProps) => {
  const params = new URLSearchParams(location.search);
  const _list: ITaskList = mockData.columns["column-1"];
  const  {id, taskIds} = _list;
  const {list, setList} = useTaskList(taskIds);

  function onDragEnd(result: object): void {
    // TODO
    const {destination, source, draggableId, type}:any = result;
    // If destination is not a droppable area
    if(!destination) {return;}
    // If the draggable object not move
    if(destination.droppableId === source.droppableId && destination.index === source.index) {return;}

    const newListIds = Array.from(list);
    list.splice(source.index, 1);
    list.splice(destination.index, 0, draggableId);
    setList(list);
  }
  return (
    <Container>
      <Form>
        <Layout style={{backgroundColor: "#fff"}}>
          <Form.Item style={{margin: "16px 8px"}}>
            <Input placeholder="Add a new task"/>
          </Form.Item>
        </Layout>
      </Form>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList id={id} type="today" list={list}/>
      </DragDropContext>
    </Container>
  );
};

export default TaskBoard;
