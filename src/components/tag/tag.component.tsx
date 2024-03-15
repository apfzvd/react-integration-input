import cx from 'classnames';
import { ReactNode } from 'react';

import styles from './tag.module.css';

export enum TagTypes {
  info = 'info',
  positive = 'positive',
  negative = 'negative',
}

type TagProps = {
  children: ReactNode;
  className?: string;
  type?: TagTypes;
};

export const Tag = ({ type = TagTypes.info, children, className }: TagProps) => {
  return (
    <div className={cx(styles.tagContainer, className, { [styles[type]]: type })}>{children}</div>
  );
};
