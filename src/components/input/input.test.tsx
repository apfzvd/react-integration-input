import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { Input, InputProps } from './input.component';

const renderComponent = (props: InputProps) => {
  return render(<Input {...props} />);
};

const baseProps = {
  label: 'Fake Input',
  labelId: 'fake-input',
  placeholder: 'this is a placeholder',
  onChange: vi.fn(),
};

describe.only('Input', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should show label and input correctly', () => {
    renderComponent(baseProps);

    const label = screen.queryByText(baseProps.label);
    const input = screen.queryByLabelText(baseProps.label);

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('focus input when has prop focus', () => {
    renderComponent({ ...baseProps, focus: true });

    const input = screen.getByLabelText(baseProps.label);

    expect(input).toHaveFocus();
  });

  it('should call onChange when typing', () => {
    renderComponent(baseProps);

    const input = screen.getByLabelText(baseProps.label);
   
    const typedValue = 'typing texts!';
    fireEvent.change(input, { target: { value: typedValue } })

    expect(baseProps.onChange).toBeCalledWith(typedValue);
  });

  it('shows error style when validation fails', () => {
    const props: InputProps = {
      ...baseProps,
      validation: [(value) => ({ hasError: value.length < 3 })]
    }
    renderComponent(props);

    const input = screen.getByLabelText(baseProps.label);
   
    const typedValue = 'hi';
    fireEvent.change(input, { target: { value: typedValue } })
    fireEvent.blur(input)

    expect(input.classList).toMatch(/error/i);
  });
});
