import { Layout } from 'antd';
import { History } from 'history';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import ProfileForm from '../components/ProfileForm';
import UserIcon from '../components/UserIcon';
import { useFetchProfile, useUpdateProfile } from '../hooks/userHooks';
import { IUser } from '../types';

const { Header, Content, Footer } = Layout;


const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 100vw;
`;

interface IProfileProps {
  history: History;
}

const Profile = ({ history }: IProfileProps) => {
  const { user } = useFetchProfile();
  const { updateProfile } = useUpdateProfile();

  const handleSubmit = useCallback((_user: IUser) => {
    updateProfile({ user: _user });
    history.goBack();
  }, [history, updateProfile]);

  const handleCancel = useCallback(() => {
    history.goBack();
  }, [history]);

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
