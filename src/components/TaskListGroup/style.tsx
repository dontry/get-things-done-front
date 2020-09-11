import styled from 'styled-components';
import { Collapse } from 'antd';

export const StyledCollapse = styled(Collapse)`
  border: 0;
  background-color: #fff;
  .ant-collapse-content-box {
    padding: 1rem 0;
    border: 0;
  }
  .ant-collapse-item {
    border: 0;
  }
  .ant-collapse-header {
    padding-left: 20px;
    .ant-collapse-arrow {
      left: 0;
    }
  }
`;
