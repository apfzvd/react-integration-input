import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import Loading from 'src/assets/loading.svg?react';

import styles from './button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  leftIcon?: ReactElement;
  iconButton?: boolean;
  active?: boolean;
  label?: string;
  loading?: boolean;
};

export const Button = ({
  leftIcon,
  children,
  className,
  disabled = false,
  iconButton,
  active = false,
  label,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      aria-label={label}
      disabled={disabled || loading}
      className={cx(styles.base, className, {
        [styles.iconButton]: iconButton,
        [styles.active]: active,
        [styles.loading]: loading
      })}
      {...props}
    >
      {loading ? (
        <Loading title="button-loading-icon" />
      ) : (
        <>
          {leftIcon} {children}
        </>
      )}
    </button>
  );
};
