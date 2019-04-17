import { observable, action } from "mobx";
import { RequestType } from "src/types";

class RequestStore {
  @observable public requests = observable.map({});

  @action
  public setRequestInProgress(requestType: RequestType, inProgress: boolean) {
    this.requests.set(requestType, inProgress);
  }

  public getRequestByType(type: RequestType) {
    return this.requests.get(type);
  }
}

const requestStore = new RequestStore();

export default requestStore;
export { RequestStore };
