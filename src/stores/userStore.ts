import { observable, action, computed } from "mobx";
import { persist } from "mobx-persist";
import { IUser } from "src/types";
import _ from "lodash";

class UserStore {
  @persist("object") @observable public user = {};

  @computed
  public get authenticated(): boolean {
    return !_.isEmpty(this.user);
  }

  @action
  public mergeUser(user: IUser): void {
    this.user = user;
  }

  @action
  public clearUser(): void {
    this.user = {};
  }
}

const userStore = new UserStore();

export default userStore;
export { UserStore };
