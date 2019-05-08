import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Layout, Avatar } from "antd";
import { IUser } from "../types";
import ProfileForm from "../components/ProfileForm";
import UserIcon from "../components/UserIcon";
import { register } from "../actions/authAction";

const { Header, Content, Footer } = Layout;

interface IProfileProps {
  user: IUser;
}

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 100vw;
`;

const Profile = ({ user }: IProfileProps) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <UserIcon />
      </Header>
      <Content>
        <FormWrapper>
          <ProfileForm onSubmit={register} user={user} />;
        </FormWrapper>
      </Content>
      <Footer
        style={{ textAlign: "center" }}
      >{`GTD © ${new Date().getFullYear()} Created by Dontry`}</Footer>
    </Layout>
  );
};

export default inject("userStore")(
  observer(({ userStore }) => {
    return <Profile user={userStore.user} />;
  })
);
