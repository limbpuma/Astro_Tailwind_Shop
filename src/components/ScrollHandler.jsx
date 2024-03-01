import React, { useEffect } from 'react';

const ScrollHandler = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.hero-section');
    let currentSectionIndex = -1;
    let startY = 0; // Variable para almacenar la posición inicial del toque

    const handleScroll = (e) => {
      if (currentSectionIndex === -1) return;
      e.preventDefault();

      if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        currentSectionIndex--;
      }

      sections[currentSectionIndex]?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const moveY = e.touches[0].clientY;
      const deltaY = startY - moveY;

      if (deltaY > 20) { // Desplazamiento hacia abajo
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
          sections[currentSectionIndex]?.scrollIntoView({ behavior: 'smooth' });
          e.preventDefault();
        }
      } else if (deltaY < -20) { // Desplazamiento hacia arriba
        if (currentSectionIndex > 0) {
          currentSectionIndex--;
          sections[currentSectionIndex]?.scrollIntoView({ behavior: 'smooth' });
          e.preventDefault();
        }
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSectionIndex = Array.from(sections).indexOf(entry.target);
        }
      });
    }, { threshold: 1 });

    sections.forEach(section => observer.observe(section));
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ScrollHandler;
