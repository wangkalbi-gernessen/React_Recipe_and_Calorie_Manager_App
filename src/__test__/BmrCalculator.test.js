import React from 'react';
import { render } from '@testing-library/react';
import BmrCalculator from '../components/BMR/BmrCalculator';

describe('BmrCalculator', () => {
  test('renders default state', () => {
    const { getByTestId } = render(<BmrCalculator />);
    const age = getByTestId("age");
    const male = getByTestId("male");
    const female = getByTestId("female");
    const height = getByTestId("height");
    const weight = getByTestId("weight");

    expect(age.value).toBe("0");
    expect(male.checked).toEqual(true);
    expect(female.checked).toEqual(false);
    expect(height.value).toBe("0");
    expect(weight.value).toBe("0");
  }); 
});