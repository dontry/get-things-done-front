import React from 'react';
import { inject, observer } from 'mobx-react';
import ProjectBoard from '../components/ProjectBoard';

export default inject('userStore')(
  observer(({ userStore, ...rest }) => {
    return <ProjectBoard userId={userStore.userId} {...rest} />;
  })
);
