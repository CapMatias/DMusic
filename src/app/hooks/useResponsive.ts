import { useState, useEffect } from 'react';

function getIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

function getWindowWidth() {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth;
}

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    windowWidth,
    albumSize: isMobile ? 170 : 140,
  };
}