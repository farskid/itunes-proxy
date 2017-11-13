import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/**
 * NOTE: This file is only present to confugre enzyme adapter.
 * And it is referenced in `package.json`
 */

// Setup enzyme adapter to work properly with React 16
configure({
  adapter: new Adapter()
});
