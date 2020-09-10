import { inject, observer } from 'mobx-react';
import React from 'react';

import ProjectBoard from '../components/ProjectBoard';

export default inject('userStore')(
  observer(({ userStore, ...rest }) => <ProjectBoard userId={userStore.userId} {...rest} />)
);
