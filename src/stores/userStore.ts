import { observable, action, computed } from "mobx";
import hydrate from "../lib/hydrate";
import { persist } from "mobx-persist";
import { IUser } from "src/types";
import _ from "lodash";

class UserStore {
  @persist("object") @observable public user: IUser | undefined;

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
    this.user = undefined;
  }
}

const userStore = new UserStore();
hydrate("user", userStore);

export default userStore;
export { UserStore };
