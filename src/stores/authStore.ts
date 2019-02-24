import { observable, action } from "mobx";

class AuthStore {
  @observable authenticated: boolean = false;

  constructor() {}

  @action verify(): void {
    this.authenticated = true;
  }
}
const authStore = new AuthStore();

export default authStore;
export { AuthStore };
