import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-secondary rounded-xl shadow-2xl w-full max-w-lg border border-border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center justify-between p-4 border-b border-border" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-semibold text-primary">{title}</h3>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
          
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
