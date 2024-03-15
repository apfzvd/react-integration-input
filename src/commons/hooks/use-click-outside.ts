import { MutableRefObject, useEffect, useRef } from 'react';

export const useOutsideClick = (
  callback: () => void,
): { ref: MutableRefObject<HTMLDivElement | null> } => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref?.current?.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);

  return { ref }
};
