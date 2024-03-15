import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { Menu, MenuProps } from './menu.component';

const renderComponent = (props: MenuProps) => {
  return render(<Menu {...props} />);
};

const baseProps = {
  title: 'fake-menu',
  open: true,
  onClickItem: vi.fn(),
  items: [
    {
      id: '1',
      logo: <img alt="fake-1" src="#1" />,
      label: 'Item 1',
    },
    {
      id: '2',
      logo: <img alt="fake-2" src="#2" />,
      label: 'Item 2',
    },
  ],
};

describe('Menu', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should show menu and itens on open: true', () => {
    renderComponent(baseProps);

    const title = screen.queryByText(baseProps.title);
    const item1 = screen.queryByText(baseProps.items[0].label);
    const item2 = screen.queryByText(baseProps.items[1].label);

    expect(title).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('should call onClickItem when clicks on item', () => {
    renderComponent(baseProps);

    const item1 = screen.getByText(baseProps.items[0].label);
    fireEvent.click(item1);

    expect(baseProps.onClickItem).toBeCalledWith(baseProps.items[0], 0);
  });

  it('should not call onClickItem when clicks on disabled item', () => {
    const props = {
      ...baseProps,
      items: [
        {
          id: '3',
          logo: <img alt="fake-1" src="#1" />,
          label: 'Item disabled',
          disabled: true,
        }
      ]
    };
    renderComponent(props);

    const item1 = screen.getByText(props.items[0].label);
    fireEvent.click(item1);

    expect(props.onClickItem).not.toBeCalled();
  });
});
