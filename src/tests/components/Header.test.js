import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import toJSON from 'enzyme-to-json';

let startLogoutSpie, wrapper;

beforeEach(() => {
    startLogoutSpie = jest.fn();    
    wrapper = shallow(<Header startLogout={startLogoutSpie} />);
});

test('should render Header correctly with shallow', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Expenses App');

});

test('should call startLogout on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogoutSpie).toHaveBeenCalled();
});
