import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';

import routerStore from '../../stores/routerStore';

export default function() {
  const browserHistory = createBrowserHistory();
  syncHistoryWithStore(browserHistory, routerStore);
}
