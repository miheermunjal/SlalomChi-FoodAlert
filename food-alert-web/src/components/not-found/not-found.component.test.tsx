import * as React from 'react';
import { shallow } from 'enzyme';

import 'util/test.util';

import { NotFoundComponent } from 'components/not-found/not-found.component';

describe('Not Found Component', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<NotFoundComponent />);
    expect(wrapper.find(NotFoundComponent)).not.toBeNull();
  });

});
