import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FullscreenImageModal = ({ isOpen, imageSrc, onClose }) => {
  const modalRef = useRef(null);

  // GSAP animation on open/close
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  // Esc key to close
  useEffect(() => {
     if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
  className="fixed inset-0 z-[99999] bg-black bg-opacity-90 flex justify-center items-center"
  onClick={onClose}
>

     <div
        ref={modalRef}
        className="relative w-[80vw] h-[70vh] bg-transparent flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt="Full Screen image of the certitificate"
     className="max-w-full max-h-full rounded-xl object-contain shadow-lg"
         
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-4xl font-bold focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default FullscreenImageModal;
