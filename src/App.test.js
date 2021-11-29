import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import  { configure, shallow } from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() });
describe('Search component', () => {
  test('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);  
  });
});