import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface NeumorphicProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: any;
  glass?: boolean;
}

export const Card: React.FC<NeumorphicProps> = ({ children, className = '', as: Component = 'div', glass = false }) => {
  return (
    <Component 
      className={`${glass ? 'bg-white/40 backdrop-blur-xl border border-white/40' : 'bg-nm-bg'} rounded-[32px] shadow-nm-flat transition-all duration-300 hover:shadow-nm-hover hover:-translate-y-1 ${className}`}
    >
      {children}
    </Component>
  );
};

export const Button: React.FC<NeumorphicProps & { variant?: 'primary' | 'secondary' }> = ({ 
  children, 
  className = '', 
  onClick,
  variant = 'secondary'
}) => {
  const isPrimary = variant === 'primary';
  
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0.5 }}
      onClick={onClick}
      className={`
        px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2
        ${isPrimary 
          ? 'bg-nm-accent text-white shadow-nm-flat hover:bg-nm-accent-light' 
          : 'bg-nm-bg text-nm-ink shadow-nm-flat active:shadow-nm-pressed'
        }
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export const IconButton: React.FC<NeumorphicProps> = ({ children, className = '', onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0.5 }}
      onClick={onClick}
      className={`
        w-12 h-12 rounded-2xl bg-nm-bg text-nm-ink shadow-nm-flat flex items-center justify-center transition-all duration-300 active:shadow-nm-pressed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export const InsetContainer: React.FC<NeumorphicProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-nm-bg rounded-2xl shadow-nm-pressed p-4 ${className}`}>
      {children}
    </div>
  );
};

export const DeepInsetContainer: React.FC<NeumorphicProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-nm-bg rounded-2xl shadow-nm-inset-deep p-4 ${className}`}>
      {children}
    </div>
  );
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-nm-bg/95"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-nm-bg rounded-[40px] shadow-nm-flat p-4 md:p-6 overflow-hidden"
          >
            <IconButton 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 !bg-white/40"
            >
              <X size={24} />
            </IconButton>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
