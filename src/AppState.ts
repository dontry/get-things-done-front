import { observable, action } from "mobx";
import { FieldState } from "./components/FieldInput";

class AppSate {
  @observable
  items: string[] = [];

  @observable
  currentItem: FieldState = new FieldState();

  @action
  addCurrentItem = () => {
    this.items = [...this.items, this.currentItem.value];
    this.currentItem.value = "";
  };

  @action
  reset = () => {
    this.items = [];
    this.currentItem.onchange("");
  };
}

export const appState = new AppSate();
