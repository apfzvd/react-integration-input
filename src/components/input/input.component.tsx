import cx from 'classnames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import styles from './input.module.css';

type ValidationFunction = (value: string) => { hasError: boolean };

export type InputProps = {
  label?: string;
  labelId?: string;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  validation?: ValidationFunction[];
  focus?: boolean;
};

export const Input = ({
  defaultValue,
  placeholder,
  className,
  validation,
  disabled = false,
  label,
  labelId,
  focus = false,
  onChange,
}: InputProps) => {
  const input = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (focus && input.current) {
      input.current.focus();
    }
  }, [focus]);

  const validate = (currentValue: string) => {
    const validationList = validation?.map((validationFunc) => validationFunc(currentValue));
    const hasValidationError =
      validationList?.some((validationResult) => validationResult.hasError) || false;

    setHasError(hasValidationError);
  };

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentValue = evt.target.value;

    validate(currentValue);

    onChange(currentValue);
  };

  return (
    <div>
      {!!label && (
        <label id={labelId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={input}
        className={cx(styles.input, className, { [styles.error]: hasError })}
        aria-labelledby={labelId}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};
