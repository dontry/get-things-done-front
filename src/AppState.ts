import { observable, action } from 'mobx';
import { FieldState } from './components/FieldInput';

class AppSate {
  @observable
  public items: string[] = [];

  @observable
  public currentItem: FieldState = new FieldState();

  @action
  public addCurrentItem = () => {
    this.items = [...this.items, this.currentItem.value];
    this.currentItem.value = '';
  };

  @action
  public reset = () => {
    this.items = [];
    this.currentItem.onChange('');
  };
}

export const appState = new AppSate();
