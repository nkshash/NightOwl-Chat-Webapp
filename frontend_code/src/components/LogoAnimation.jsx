import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/logo.json';

function LogoAnimation() {
  useEffect(() => {
    // Set up Lottie animation
    const container = document.getElementById('animation-container');
    const animation = lottie.loadAnimation({
      container,
      renderer: 'svg', // Use 'svg' or 'canvas'
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    // Clean up
    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div id="animation-container" style={{ width: 'auto', height: '50px' }}></div>
    
  );
}

export default LogoAnimation;