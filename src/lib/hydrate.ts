import { create } from 'mobx-persist';

const _hydrate = create({
  storage: window.localStorage,
  jsonify: true
});

const hydrate = (name: string, store: any): Promise<void> =>
  _hydrate(name, store).then(() => console.log(`Store ${name} has been hydrated`));

export default hydrate;
