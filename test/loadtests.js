import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Add support for all files in the test directory
const testsContext = require.context('.', true, /(Test\.js$)/);
testsContext.keys().forEach(testsContext);
