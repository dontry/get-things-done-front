import { apiService } from '../../api';
import { ILoginCredential } from '../../types';
import userStore from '../../stores/userStore';
import { persistanceService } from '../../classes/PersistanceService';

function loginUser(credential: ILoginCredential) {
  return apiService.post('/auth/login', credential).then(res => {
    const { user, token } = res.data;
    userStore.mergeUser(user);
    persistanceService.setItem('token', token);
    return;
  });
}

export default loginUser;
