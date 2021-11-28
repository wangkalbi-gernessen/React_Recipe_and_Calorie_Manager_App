import React from 'react';
import { render, screen } from '@testing-library/react';
import BmrCalculator from '../components/BMR/BmrCalculator';

describe('BmrCalculator', () => {
  test('renders BmrCalculator component', () => {
    render(<BmrCalculator />);
    expect(screen.getByText(/Gender/)).toBeInTheDocument();
  }); 
});