import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Layout, Avatar } from 'antd';
import { IUser } from '../types';
import ProfileForm from '../components/ProfileForm';
import UserIcon from '../components/UserIcon';
import { useFetchProfile, useUpdateProfile } from '../hooks/userHooks';

const { Header, Content, Footer } = Layout;

interface IProfileProps {
  history: History;
}

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 100vw;
`;

const Profile = ({ history }: IProfileProps) => {
  const { user } = useFetchProfile();
  const { updateProfile } = useUpdateProfile();

  const handleSubmit = useCallback((_user: IUser) => {
    updateProfile({ user: _user });
    window.history.back();
  }, []);

  const handleCancel = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <UserIcon />
      </Header>
      <Content>
        <FormWrapper>
          {user && <ProfileForm user={user} onSubmit={handleSubmit} onCancel={handleCancel} />}
        </FormWrapper>
      </Content>
      <Footer
        style={{ textAlign: 'center' }}
      >{`GTD © ${new Date().getFullYear()} Created by Don`}</Footer>
    </Layout>
  );
};

export default Profile;
