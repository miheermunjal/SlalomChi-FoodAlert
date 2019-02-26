import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';

export default configure({ adapter: new ReactSixteenAdapter() });
