import _ from 'lodash';
import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import hydrate from '../lib/hydrate';
import { IUser } from '../types';

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
    // eslint-disable-next-line id-blacklist
    this.user = undefined;
  }
}

const userStore = new UserStore();
hydrate('user', userStore);

export default userStore;
export { UserStore };
