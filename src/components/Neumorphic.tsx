import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

// 重建：原文件被上游误删，这里用轻量实现还原所有导出组件

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

// 拟态风格卡片容器
export const Card: React.FC<CardProps> = ({ className = '', glass, children, ...props }) => (
  <div
    className={`rounded-3xl p-6 ${
      glass
        ? 'bg-white/30 backdrop-blur-xl shadow-nm-flat'
        : 'bg-nm-bg shadow-nm-flat'
    } ${className}`}
    {...props}
  >
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'default';
}

// 拟态风格按钮
export const Button: React.FC<ButtonProps> = ({ variant = 'default', className = '', children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
      variant === 'primary'
        ? 'bg-nm-accent text-white shadow-nm-sm hover:brightness-110 active:shadow-nm-inset'
        : 'bg-nm-bg text-nm-ink shadow-nm-flat hover:shadow-nm-hover active:shadow-nm-inset'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// 拟态风格图标按钮
export const IconButton: React.FC<IconButtonProps> = ({ className = '', children, ...props }) => (
  <button
    className={`w-12 h-12 rounded-2xl bg-nm-bg shadow-nm-flat flex items-center justify-center text-nm-muted hover:text-nm-ink hover:shadow-nm-hover active:shadow-nm-inset transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

interface InsetContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

// 内凹容器
export const InsetContainer: React.FC<InsetContainerProps> = ({ className = '', children, ...props }) => (
  <div
    className={`rounded-2xl bg-nm-bg shadow-[inset_4px_4px_7px_rgba(163,177,198,0.6),inset_-4px_-4px_7px_rgba(255,255,255,0.5)] p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

interface DeepInsetContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

// 深度内凹容器
export const DeepInsetContainer: React.FC<DeepInsetContainerProps> = ({ className = '', children, ...props }) => (
  <div
    className={`rounded-2xl bg-nm-bg shadow-[inset_6px_6px_12px_rgba(163,177,198,0.7),inset_-6px_-6px_12px_rgba(255,255,255,0.5)] p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

// 模态弹窗
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-nm-bg rounded-[32px] shadow-nm-flat p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="关闭"
            className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-nm-bg shadow-nm-sm flex items-center justify-center text-nm-muted hover:text-nm-ink transition-colors z-10"
          >
            <X size={18} />
          </button>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
