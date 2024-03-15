import cx from 'classnames';
import { ReactNode } from 'react';

import styles from './card.module.css';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return <div className={cx(styles.cardContainer, className)}>{children}</div>;
};
