import userStore, { UserStore } from "./userStore";
import authStore, { AuthStore } from "./authStore";
import { persist } from "mobx-persist";

class AppStore {
  @persist("object") userStore: any = new UserStore();
  @persist("object") authStore: any = new AuthStore();
  constructor() {}

  getAllState() {
    return {
      userStore: this.userStore,
      authStore: this.authStore
    };
  }
}
const appStore = new AppStore();

export default appStore;
