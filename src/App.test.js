import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe('Search component', () => {
  it('renders', () => {
    const wrapper = shallow(<App />).dive();
  });
});