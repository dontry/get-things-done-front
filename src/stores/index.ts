import { persist } from "mobx-persist";
import hydrate from "../lib/hydrate";
import userStore from "./userStore";
import authStore from "./authStore";
import { RouterStore } from "mobx-react-router";

const routerStore = new RouterStore();
hydrate(routerStore);


export { userStore, authStore, routerStore };
