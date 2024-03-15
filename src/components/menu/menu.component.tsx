import cx from 'classnames';
import { ReactElement } from 'react';

import { Card } from '../card/card.component';
import styles from './menu.module.css';

export type MenuItem = {
  id: string;
  logo: ReactElement;
  label: string;
  className?: string;
  onClick?: (item: MenuItem, index: number) => void;
  disabled?: boolean;
};

export type MenuProps = {
  open: boolean;
  title: string;
  items: MenuItem[];
  className?: string;
  onClickItem?: (item: MenuItem, index: number) => void;
};

export const Menu = ({ open, title, items, onClickItem, className }: MenuProps) => {
  if (!open) {
    return null;
  }

  const onCLickItemHandler = (item: MenuItem, index: number) => {
    if (item.disabled) {
      return;
    }

    if (item.onClick) {
      item.onClick(item, index);
      return;
    }

    onClickItem && onClickItem(item, index);
  };

  return (
    <Card className={cx(styles.container, className)}>
      <p className={styles.title}>{title}</p>
      <div>
        {items.map((item, index) => (
          <button
            key={item.id}
            className={cx(styles.item, item.className, { [styles.itemDisabled]: item.disabled })}
            onClick={() => onCLickItemHandler(item, index)}
          >
            {item.logo} {item.label}
          </button>
        ))}
      </div>
    </Card>
  );
};
