import { createBrowserHistory } from 'history';
import { shallow } from 'enzyme';
import * as React from 'react';

import 'util/test.util';

import { AppComponent } from 'components/app/app.component';

describe('App Component', () => {

  it('should render', () => {
    const props = {
      user: {},
      history: createBrowserHistory()
    };

    const wrapper = shallow(<AppComponent {...props} />);
    expect(wrapper.find(AppComponent)).not.toBeNull();
  });

});
