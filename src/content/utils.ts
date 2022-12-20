import { useEffect } from 'react';

// Hook that runs function on clicks outside of the passed ref
export const useOutsideAlerter = (ref: any, handleClick: Function) => {
  const handleClickOutside = (e: Event) => {
    if (ref?.current && !ref.current.contains(e.target)) handleClick();
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
