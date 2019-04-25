import { observable, action } from "mobx";
import { ErrorType } from "../types";

class ErrorStore {
  @observable public errors = observable.map({});

  @action
  public setError(errorType: ErrorType, errorMessage: string) {
    this.errors.set(errorType, errorMessage);
  }

  @action
  public clearError(type: ErrorType) {
    this.errors.delete(type);
  }

  public getError(type: ErrorType) {
    return this.errors.get(type);
  }
}

const errorStore = new ErrorStore();

export default errorStore;
export { ErrorStore };
