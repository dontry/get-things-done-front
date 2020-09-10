import { action, observable } from 'mobx';

import { MessageType } from '../types';

class MessageStore {
  @observable public messages = observable.map({});

  @action
  public setError(messageType: MessageType, message: string) {
    this.messages.set(messageType, message);
  }

  @action
  public clearError(type: MessageType) {
    this.messages.delete(type);
  }

  public getError(type: MessageType) {
    return this.messages.get(type);
  }
}

const messageStore = new MessageStore();

export default messageStore;
export { MessageStore };
