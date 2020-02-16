import { useState, useEffect } from 'preact/hooks';

export const useResize = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  const onResize = () => {
    const width = window.innerWidth;

    setScreenWidth(width);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize, false);

    onResize();

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return { screenWidth };
};
