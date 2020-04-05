import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';
import expenses from '../fixtures/expenses';

let startLoginSpie, wrapper;

beforeEach(() => {
    startLoginSpie = jest.fn();
    wrapper = shallow(<LoginPage startLogin={startLoginSpie}/>);
})

test('should render LoginPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLoginSpie).toHaveBeenCalled();
});
