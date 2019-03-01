import styled from "styled-components";
import Editable from "../EditableComponent";

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
