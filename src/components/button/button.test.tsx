import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import PlusIcon from 'src/assets/icons/plus.svg?react';

import { Button } from './button.component';

describe('Button', () => {
  it('should render successfully with children', () => {
    render(<Button>Hey button!</Button>);
    const child = screen.queryByText('Hey button!');
    expect(child).toBeInTheDocument();
  });

  it('should render successfully with leftIcon', () => {
    render(<Button leftIcon={<PlusIcon title="plus-icon" />}>Hey button with icon!</Button>);
    const icon = screen.queryByTitle('plus-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should render only loading icon when loading', () => {
    render(<Button loading>Hey loading button!</Button>);
    const loadingIcon = screen.queryByTitle('button-loading-icon');
    expect(loadingIcon).toBeInTheDocument();
  });
});
