import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../components/Header';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import toJSON from 'enzyme-to-json';

test('should render Header correctly with shallow',()=>{
    const wrapper = shallow(<Header />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Expensify');
  
    });