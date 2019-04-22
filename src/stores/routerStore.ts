import { persist } from "mobx-persist";
import hydrate from "../lib/hydrate";
import { RouterStore } from "mobx-react-router";

const routerStore = new RouterStore();
// hydrate(routerStore);

export default routerStore;
