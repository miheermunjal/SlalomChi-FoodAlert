import { shallow } from 'enzyme';
import * as React from 'react';

import 'util/test.util';

import { HomeComponent } from 'components/home/home.component';

describe('Home Component', () => {

  it('renders without crashing', () => {
    const props = {
      getFood: jest.fn(),
      metrics: [],
    };

    const wrapper = shallow(<HomeComponent {...props} />);
    expect(wrapper.find(HomeComponent)).not.toBeNull();
  });

});
