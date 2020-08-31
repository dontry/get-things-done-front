import { observable, action, computed } from 'mobx';
import hydrate from '../lib/hydrate';
import { persist } from 'mobx-persist';
import { IUser } from '../types';
import _ from 'lodash';

class UserStore {
  @persist('object') @observable public user: IUser | undefined;

  @computed
  public get authenticated(): boolean {
    return !_.isEmpty(this.user);
  }

  @computed
  public get userId(): string | undefined {
    return _.get(this, 'user.id');
  }

  @action
  public updateUser(user?: IUser): void {
    if (user) {
      this.user = user;
    }
  }

  @action
  public clearUser(): void {
    this.user = undefined;
  }
}

const userStore = new UserStore();
hydrate('user', userStore);

export default userStore;
export { UserStore };
