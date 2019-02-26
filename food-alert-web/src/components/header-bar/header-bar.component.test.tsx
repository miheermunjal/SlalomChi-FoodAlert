import * as React from 'react';
import { shallow } from 'enzyme';

import 'util/test.util';

import { HeaderBar } from 'components/header-bar/header-bar.component';

describe('Header Bar', () => {

  it('renders without crashing', () => {
    const props = {
      title: 'title'
    };

    const wrapper = shallow(<HeaderBar {...props} />);
    expect(wrapper.find(HeaderBar)).not.toBeNull();
  });

});
