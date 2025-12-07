import React from 'react';

const ScanningFrame = ({ imageSrc }) => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg group">
      {/* The Image */}
      <img 
        src={imageSrc} 
        alt="Scan Input" 
        className="w-full h-80 object-cover" 
      />
      
      {/* Overlay: Darken slightly to make laser pop */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* The Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan"></div>
      
      {/* Grid Overlay for "Tech" feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
};

export default ScanningFrame;