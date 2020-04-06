import React from 'react';
import { shallow } from 'enzyme';
import { LoadingPage } from '../../components/LoadingPage';
import toJSON from 'enzyme-to-json';

let  wrapper;

beforeEach(() => {
    wrapper = shallow(<LoadingPage />);
});

test('should render LoadingPage correctly with shallow', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
    const IMAGE_PATH = '/images/loader.gif';
    expect(wrapper.find('img').prop('src')).toEqual(IMAGE_PATH);
});
