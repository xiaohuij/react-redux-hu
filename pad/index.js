import './index.styl';
import 'modules/fonts/font.styl';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configStore from 'modules/shared/configStore';
import getRootRoutes from './getRootRoutes';
import rootReducer from './rootReducer';

const finalStore = configStore({
  history: hashHistory,
  rootReducer,
});

const history = syncHistoryWithStore(hashHistory, finalStore);

render(
  <Provider store={finalStore} >
    <Router
      history={history}
      routes={getRootRoutes()}
    />
  </Provider>,
  document.getElementById('app')
);
