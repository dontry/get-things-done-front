import { observable, action } from "mobx";

class AuthStore {
  @observable authenticated: boolean = false;

  constructor() {}

  @action verify(): void {
    console.log(this.authenticated);
    this.authenticated = true;
  }
}
const authStore = new AuthStore();

export default authStore;
export { AuthStore };
