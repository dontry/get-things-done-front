import { action, computed, observable } from 'mobx';

import { RequestType } from '../types';

const CURRENT_QUERY_KEY = 'currentQueryKey';

class RequestStore {
  @observable public requests = observable.map({});

  @action
  public setRequestInProgress(requestType: RequestType, inProgress: boolean) {
    this.requests.set(requestType, inProgress);
  }

  @action
  public setCurrentQueryKey(queryKey: any): void {
    this.requests.set(CURRENT_QUERY_KEY, queryKey);
  }

  public getRequestByType(type: RequestType) {
    return this.requests.get(type);
  }

  @computed
  public get currentQueryKey(): any {
    return this.requests.get(CURRENT_QUERY_KEY);
  }
}

const requestStore = new RequestStore();

export default requestStore;
export { RequestStore };
