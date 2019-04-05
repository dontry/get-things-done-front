import { UserStore } from "./userStore";
import { AuthStore } from "./authStore";
import { persist } from "mobx-persist";
import { RouterStore } from "mobx-react-router";

class AppStore {
  @persist("object") public user: UserStore = new UserStore();
  @persist("object") public auth: AuthStore = new AuthStore();
  @persist("object") public router: RouterStore = new RouterStore();
  // tslint:disable-next-line:no-empty
  constructor() {}

  public getAllState() {
    return {
      user: this.user,
      auth: this.auth,
      router: this.router
    };
  }
}
const appStore = new AppStore();

export default appStore;
