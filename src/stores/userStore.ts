import { observable, action } from "mobx";
import { persist } from "mobx-persist";

class UserStore {
  @persist("object") @observable public user = {};
  constructor() {}
}

const userStore = new UserStore();

export default userStore;
export { UserStore };
