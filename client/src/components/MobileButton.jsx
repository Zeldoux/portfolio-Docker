import React, { useState, useEffect } from 'react';


/**
 * Component: MobileButton
 * Displays a button only on mobile devices to scroll back to the top of the page when scrolled down.
 */
function MobileButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768; // Check if the screen is mobile-sized
      const hasScrolledDown = window.scrollY > 200; // Check if the user has scrolled down
      setIsVisible(isMobile && hasScrolledDown); // Show button only if both conditions are true
    };

    // Attach the scroll and resize event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial check for visibility on component mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Scroll to top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      />
    )
  );
}

export default MobileButton;
