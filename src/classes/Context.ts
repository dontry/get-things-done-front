import { IContext } from 'src/types';

export class Context {
  constructor(private name: string) {}

  public toJson(): IContext {
    return {
      name: this.name
    };
  }
}
