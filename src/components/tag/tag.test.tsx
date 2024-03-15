import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Tag } from './tag.component';

describe('Tag', () => {
  it('should render successfully with correct props', () => {
    render(<Tag>Hey tag!</Tag>);
    const child = screen.getByText('Hey tag!');
    expect(child).toBeInTheDocument();
  });
});
