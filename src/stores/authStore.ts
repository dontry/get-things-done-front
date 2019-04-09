import { observable, action } from "mobx";
import { persist } from "mobx-persist";

class AuthStore {
  @persist @observable public authenticated: boolean = false;

  // tslint:disable-next-line:no-empty
  constructor() {}

  @action public verify(): void {
    this.authenticated = true;
  }
}
const authStore = new AuthStore();

export default authStore;
export { AuthStore };
