import createBrowserHistory from 'history/createBrowserHistory';
import routerStore from '../../stores/routerStore';
import { syncHistoryWithStore } from 'mobx-react-router';

export default function() {
  const browserHistory = createBrowserHistory();
  const history = syncHistoryWithStore(browserHistory, routerStore);
}
