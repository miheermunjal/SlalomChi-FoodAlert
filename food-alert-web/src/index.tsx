import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import * as React from 'react';

import 'typeface-roboto';
import 'styles/app.scss';

import { AppComponent } from 'components/app/app.component';
import store, { history } from 'redux/store';

const target = document.querySelector('#root');
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppComponent history={history} />
    </ConnectedRouter>
  </Provider>,
  target
);
