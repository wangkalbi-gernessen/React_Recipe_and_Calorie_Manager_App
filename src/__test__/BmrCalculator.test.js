import React from 'react';
import { render } from '@testing-library/react';
import BmrCalculator from '../components/BMR/BmrCalculator';

describe('BmrCalculator', () => {
  test('renders default state', () => {
    const { getByTestId } = render(<BmrCalculator />);
    const age = getByTestId("age");
    expect(age.value).toBe("0");
  }); 
});