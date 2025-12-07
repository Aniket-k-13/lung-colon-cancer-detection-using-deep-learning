import React, { useState, useEffect } from 'react';

const LoadingSkeleton = () => {
  const [status, setStatus] = useState("Initializing Core...");
  
  // Cycle through "fake" statuses to keep user engaged
  useEffect(() => {
    const steps = [
      "Preprocessing CT Scan...",
      "Normalizing Tensors...",
      "Running EfficientNet Inference...",
      "Generating Grad-CAM Heatmap...",
      "Finalizing Diagnosis..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setStatus(steps[i]);
      i = (i + 1) % steps.length;
    }, 800); // Change text every 800ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full animate-pulse border border-slate-100">
      {/* Header Skeleton */}
      <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
      
      {/* Status Text (Dynamic) */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        <span className="text-slate-500 font-medium text-sm font-mono">{status}</span>
      </div>

      {/* Progress Bar Skeleton */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-12"></div>
        </div>
        <div className="h-3 bg-slate-200 rounded-full w-full"></div>
      </div>

      {/* Heatmap Area Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-64 bg-slate-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;