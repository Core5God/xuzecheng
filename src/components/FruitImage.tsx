import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface FruitImageProps {
  name: string;
  fallbackImage: string;
  className?: string;
}

export const FruitImage: React.FC<FruitImageProps> = ({ name, fallbackImage, className }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageError = () => {
    console.warn(`Image failed to load for ${name}. Falling back...`);
    setError(true);
  };

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <img 
        src={error ? 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800' : encodeURI(fallbackImage)} 
        alt={name}
        className={`w-full h-full object-cover transition-all duration-700 ${loading ? 'scale-110 blur-sm' : 'group-hover:scale-110'}`}
        referrerPolicy="no-referrer"
        onError={handleImageError}
        onLoad={() => setLoading(false)}
      />
      
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/10">
          <Loader2 className="w-8 h-8 animate-spin mb-2 drop-shadow-md" />
        </div>
      )}
    </div>
  );
};
