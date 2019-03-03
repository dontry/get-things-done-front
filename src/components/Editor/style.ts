import styled from "styled-components";
import Editable from "../EditableComponent";
import { Select } from "antd";

export const EditorWrapper = styled.div`
  border: 1px solid #ccc;
  cursor: text;
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  background-color: #fff;
`;

export const EditorControlWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Title = Editable("h2");

export const EditorTitle = styled(Title)`
  width: 100%;
  text-align: center;
`;

export const CategorySelectWrapper = styled.div`
  width: 120px;
`;

export const CalendarWrapper = styled.div`
  position: absolute;
  left: 122px;
  top: 0;
  width: 300px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  .ant-select {
    width: auto;
  }
`;
