
import React, { useEffect, useRef } from 'react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  altText?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose, altText = "Zoomed result" }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus the modal when it opens
    modalRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
      ref={modalRef}
      tabIndex={-1} // Make the container focusable
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-5xl font-light hover:text-gray-300 transition-colors z-50"
        aria-label="Close image view"
      >
        &times;
      </button>
      
      {/* Container for the image to prevent closing when clicking the image itself */}
      <div 
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="image-modal-title" className="sr-only">{altText}</h2>
        <img 
          src={imageUrl} 
          alt={altText} 
          className="block max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;