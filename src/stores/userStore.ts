import { observable, action } from "mobx";
import { persist } from "mobx-persist";
import { IUser } from "src/types";

class UserStore {
  @persist("object") @observable public user = {};

  @action
  public mergeUser(user: IUser): void {
    this.user = user;
  }
}

const userStore = new UserStore();

export default userStore;
export { UserStore };
