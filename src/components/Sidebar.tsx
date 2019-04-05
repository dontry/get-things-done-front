import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const Sidebar: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const _handleCollapse = (_collapsed: boolean): void => {
    setCollapsed(_collapsed);
  };

  return (
    <Sider
      style={{ height: "100vh", background: "#fff", overflow: "auto" }}
      collapsible
      collapsed={collapsed}
      onCollapse={_handleCollapse}
    >
      <Menu mode="inline" defaultSelectedKeys={["inbox"]}>
        <Item key="inbox">
          <Icon type="inbox" />
          <span>Inbox</span>
        </Item>
        <Item key="today">
          <Icon type="star" />
          <span>Today</span>
        </Item>
        <Item key="next">
          <Icon type="select" />
          <span>Next</span>
        </Item>
        {/* <Item key="tomorrow">
          <Icon type="" />
          Tomorrow
        </Item> */}
        <Item key="scheduled">
          <Icon type="schedule" />
          <span>Scheduled</span>
        </Item>
        <Item key="someday">
          <Icon type="calendar" />
          <span>Someday</span>
        </Item>
        <Item key="references">
          <Icon type="database" />
          <span> References</span>
        </Item>
        <SubMenu
          key="projects"
          title={
            <span>
              <Icon type="file-done" />
              <span>Projects</span>
            </span>
          }
        >
          <Item>xx</Item>
          <Item>yy</Item>
        </SubMenu>
        <SubMenu
          key="goals"
          title={
            <span>
              <Icon type="exclamation-circle" />
              <span>Goals</span>
            </span>
          }
        >
          <Item>goal1</Item>
          <Item>goal2</Item>
        </SubMenu>
        <SubMenu
          key="context"
          title={
            <span>
              <Icon type="environment" /> <span>Context</span>
            </span>
          }
        >
          <Item>context1</Item>
        </SubMenu>
        <Item key="completed">
          <Icon type="check-square" />
          <span>Completed</span>
        </Item>
        <Item key="Trash">
          <Icon type="delete" />
          <span>Trash</span>
        </Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
