interface IPersistanceService {
  setItem(key: string, payload: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

export default class PersistanceService {
  private storage: IPersistanceService;
  constructor() {
    this.storage = window.sessionStorage;
  }

  public load(type: string): void {
    switch (type) {
      case "local":
        this.storage = window.localStorage;
      case "session":
      default:
        this.storage = window.sessionStorage;
    }
  }

  public setItem(key: string, payload: string) {
    this.storage.setItem(key, payload);
  }

  public removeItem(key: string) {
    this.storage.removeItem(key);
  }

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  /**
   * clear
   */
  public clear() {
    this.storage.clear();
  }
}

export const persistanceService = new PersistanceService();
