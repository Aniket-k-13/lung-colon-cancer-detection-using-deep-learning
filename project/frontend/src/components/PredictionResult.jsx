import React from 'react';

const PredictionResult = ({ result }) => {
  if (!result) return null;

  // Update check to "Cancer"
  const isCancer = result.class === "Cancer";
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full animate-in fade-in slide-in-from-bottom-4">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Diagnosis Report</h3>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-slate-600 font-medium">Prediction:</span>
        <span className={`px-4 py-1 rounded-full font-bold text-sm tracking-wide shadow-sm ${
          isCancer 
            ? 'bg-red-100 text-red-600 border border-red-200' 
            : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
        }`}>
          {result.class}
        </span>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-sm mb-2 text-slate-600">
          <span>Model Confidence</span>
          <span className="font-bold">{(result.confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              isCancer ? 'bg-red-500' : 'bg-emerald-500'
            }`} 
            style={{ width: `${result.confidence * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
