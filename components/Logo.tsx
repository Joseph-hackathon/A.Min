
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div className={`${sizeMap[size]} ${className} relative flex items-center justify-center`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]"
      >
        <defs>
          <linearGradient id="aLogoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
        </defs>
        
        {/* The bold, rounded 'A' shape matching the provided image */}
        <path 
          d="M50 15C35 15 15 65 15 78C15 85 20 88 28 88C35 88 40 82 45 78C47 76 53 76 55 78C60 82 65 88 72 88C80 88 85 85 85 78C85 65 65 15 50 15ZM50 43C54 43 57 47 57 52C57 57 54 61 50 61C46 61 43 57 43 52C43 47 46 43 50 43Z" 
          fill="url(#aLogoGradient)"
        />
      </svg>
    </div>
  );
};

export default Logo;
