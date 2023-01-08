import { useEffect, useState } from 'react';

export const HIGHLIGHT_CLASS = 'SimplifyGPT-highlight';
export const HIGHLIGHT_COLORS = { active: '#00d8ff', inactive: '#55e1fa' };

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

export const useWindowSize = () => {
  const [size, setSize] = useState<number[]>([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export const useCalcBoxDim = (width: number) => {
  const [boxDim, setBoxDim] = useState<number[]>([0, 0]);
  useEffect(() => {
    if (width < 768) {
      setBoxDim([250, 125]);
    } else if (width >= 768 && width < 1000) {
      setBoxDim([340, 170]);
    } else if (width >= 1000 && width < 1200) {
      setBoxDim([400, 200]);
    } else if (width >= 1200) {
      setBoxDim([500, 230]);
    }
  }, [width]);

  return boxDim;
};

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<number[]>([0, 0]);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition([window.pageYOffset, window.pageXOffset]);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};
