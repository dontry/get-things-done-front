import styled from 'styled-components';
import Editable from '../EditableComponent';
import { Select, Form, Layout } from 'antd';
import { Editor } from 'draft-js';

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

const Title = Editable('h2');

export const EditorTitle = styled(Title)`
  width: 100%;
  text-align: ${(props: any) => props.align || 'center'} ;
  margin: 0 auto;
  &:focus {
    background: #fff;
  }
  padding: 0 0.5em;
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

export const EditorContentWrapper = styled.div`
  padding: 0px 15px;
`;

export const EditorSider = styled(Layout.Sider)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .ant-form-item {
    margin-bottom: 8px;
  }
`;

export const SiderFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;
