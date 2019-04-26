import React from 'react';
//import sinon from 'sinon';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddLanguageFormWithHooks from '../components/AddLanguageFormWithHooks';

Enzyme.configure({adapter: new Adapter()});

describe('AddLanguageFormWithHooks', () => {
  it('renders', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <AddLanguageFormWithHooks addLanguageHandler={mockCallback} />,
    );
    expect(wrapper.find('form')).toBeTruthy();
    expect(wrapper.find('input[type="text"]')).toBeTruthy();
    expect(wrapper.find('input[type="submit"]')).toBeTruthy();
    expect(wrapper.props().addLanguageHandler).not.toBeNull();
    const foo = wrapper.find('input[type="text"]');
    foo.simulate('change', {target: {value: 'clojure'}});
    wrapper.find('form').simulate('submit', {preventDefault: () => true});
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
