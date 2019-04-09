import { create } from "mobx-persist";

const _hydrate = create({
  storage: localStorage,
  jsonify: false
});


const hydrate = (store: any): Promise<void> =>
  _hydrate("router", store).then(() => console.log(`store has been hydrated`));

export default hydrate;
