import userStore, { UserStore } from "./userStore";
import authStore, { AuthStore } from "./authStore";
import { persist } from "mobx-persist";

class AppStore {
  @persist("object") public userStore: any = new UserStore();
  @persist("object") public authStore: any = new AuthStore();
  // tslint:disable-next-line:no-empty
  constructor() {}

  public getAllState() {
    return {
      userStore: this.userStore,
      authStore: this.authStore
    };
  }
}
const appStore = new AppStore();

export default appStore;
