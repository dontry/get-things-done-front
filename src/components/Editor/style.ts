import styled from "styled-components";
import Editable from "../EditableComponent";
import { Select } from "antd";
import Sider from "antd/lib/layout/Sider";

export const EditorWrapper = styled.div`
  border: 1px solid #ccc;
  cursor: text;
  height: 400px;
  overflow-y: auto;
  background-color: #fff;
`;

export const EditorControlWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
`;

const Title = Editable("h2");

export const EditorTitle = styled(Title)`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  &:focus {
    background: #fff;
  }
`;

export const SelectWrapper = styled.div`
  width: 100%;
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

export const EditorSider = styled(Sider)`
  .ant-form-item {
    margin-bottom: 8px;
  }
`;
