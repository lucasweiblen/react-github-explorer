import React from 'react';
//import sinon from 'sinon';
import Tab from './components/Tab';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('<Tab/>', () => {
  it('renders', () => {
    const wrapper = shallow(<Tab active text="bar" />);
    expect(wrapper.find('.is-active')).toBeTruthy();
    expect(wrapper.find('span').text()).toEqual('bar');
  });

  it('renders2', () => {
    const wrapper = shallow(<Tab />);
    //console.log(wrapper.debug());
    expect(wrapper.find('li').hasClass('is-active')).toBeFalsy();
    expect(wrapper.find('span').text()).toEqual('');
  });

  it('foo', () => {
    //const mockCallback = jest.fn(x => 42 + x);
    //const wrapper = shallow(<Tab text="Foo" onClickHandler={mockCallback} />);
    //wrapper.find('a').simulate('click');
    //expect(mockCallback).toHaveBeenCalled();
    //expect(onButtonClick).to.have.property('callCount', 0);
    //const wrapper = shallow(<Tab />);
    //const wrapper = shallow(<Tab />);
    //const onButtonClick = sinon.spy(wrapper., 'handleClick');
    //wrapper.find('a').simulate('click');
    //expect(onButtonClick.called).toBe(true);
  });
});
