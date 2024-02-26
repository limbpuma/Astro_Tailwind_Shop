import React, { useEffect } from 'react';

const ScrollHandler = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.hero-section');
    let currentSectionIndex = -1;

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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSectionIndex = Array.from(sections).indexOf(entry.target);
        }
      });
    }, { threshold: 1 });

    sections.forEach(section => observer.observe(section));
    window.addEventListener('wheel', handleScroll, { passive: false });

    window.addEventListener('scroll', () => {
      const isInSection = Array.from(sections).some((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSectionIndex = index;
          return true;
        }
        return false;
      });

      if (!isInSection) currentSectionIndex = -1;
    });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      observer.disconnect();
    };
  }, []);

  return null; 
};

export default ScrollHandler;
