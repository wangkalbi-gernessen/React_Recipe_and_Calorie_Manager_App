import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
  test('App Unit Testing', () => {
    render(<App/>);
    screen.debug();
  });
});