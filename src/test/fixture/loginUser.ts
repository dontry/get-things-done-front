import { apiService } from '../../api';
import { persistanceService } from '../../classes/PersistanceService';
import userStore from '../../stores/userStore';
import { ILoginCredential } from '../../types';

function loginUser(credential: ILoginCredential) {
  return apiService.post('/auth/login', credential).then(res => {
    const { user, token } = res.data;
    userStore.updateUser(user);
    persistanceService.setItem('token', token);
    return;
  });
}

export default loginUser;
