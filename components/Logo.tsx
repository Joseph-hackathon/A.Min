
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
      <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
        <defs>
          <linearGradient id="aLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
        {/* Stylized rounded 'A' mimicking the provided image */}
        <path 
          d="M256 64C200 64 120 120 80 260L20 448H140L165 370H347L372 448H492L432 260C392 120 312 64 256 64ZM256 160C280 160 300 200 315 260L330 310H182L197 260C212 200 232 160 256 160Z" 
          fill="url(#aLogoGradient)"
        />
        {/* Matching the central triangle cutout from the image */}
        <path 
          d="M256 200L300 320H212L256 200Z" 
          fill="#0f172a" 
        />
      </svg>
    </div>
  );
};

export default Logo;
