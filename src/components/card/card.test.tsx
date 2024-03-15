import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Card } from './card.component';

describe('Card', () => {
  it('should render successfully with correct props', () => {
    render(<Card>Hey card!</Card>);
    const child = screen.queryByText('Hey card!');
    expect(child).toBeInTheDocument();
  });
});
