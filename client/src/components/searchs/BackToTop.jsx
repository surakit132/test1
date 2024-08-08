// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="px-3 py-6 flex justify-center items-center gap-1 w-[60px] h-[60px]  rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 "
        >
          <KeyboardArrowUpIcon fontSize="large"/>
        </button>
      )}
    </div>
  );
};

export default BackToTop;