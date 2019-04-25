import React from 'react';
import App from './App';
import Explorer from './App';
import Tab from './App';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('<App/>', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Explorer)).toBeTruthy();
  });
});
