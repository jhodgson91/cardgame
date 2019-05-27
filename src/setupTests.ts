import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
global.XMLHttpRequest = undefined

//Needs to be here because it's typescript
export default undefined
