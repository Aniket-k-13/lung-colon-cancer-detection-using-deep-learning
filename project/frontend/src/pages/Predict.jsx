import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';
import PredictionResult from '../components/PredictionResult';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { predictImage } from '../services/api';
import { User, Layers, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const Predict = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]); 
  const [summary, setSummary] = useState(null); // New State for Aggregate Result
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "M"
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (uploadedFiles) => {
    if (!formData.name || !formData.age) {
      alert("Please enter patient details first!");
      return;
    }

    setResults([]);
    setSummary(null);
    setError(null);
    setLoading(true);

    const apiData = new FormData();
    uploadedFiles.forEach((file) => {
      apiData.append('files', file); 
    });
    
    apiData.append('name', formData.name);
    apiData.append('age', formData.age);
    apiData.append('gender', formData.gender);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await predictImage(apiData);
      
      // Update state with new response structure
      setResults(response.data.results);
      setSummary(response.data.summary);
      
    } catch (err) {
      console.error(err);
      setError("Batch analysis failed. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-2">Multi-Scan Analysis</h1>
      <p className="text-slate-500 mb-8">Upload multiple CT slices. The system will aggregate findings into a single diagnosis.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <User size={18} /> Patient Info
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>
            </div>
        </div>

        {/* Upload */}
        <div className="lg:col-span-2">
           <UploadBox onImageUpload={handleUpload} />
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton />
        </div>
      )}

      {!loading && summary && results.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* --- AGGREGATE SUMMARY CARD --- */}
          <div className={`p-6 rounded-xl shadow-lg border mb-10 flex items-center justify-between ${
            summary.diagnosis === 'Cancer' 
              ? 'bg-red-50 border-red-100 text-red-900' 
              : 'bg-emerald-50 border-emerald-100 text-emerald-900'
          }`}>
            <div>
              <p className="text-sm font-bold uppercase opacity-70 mb-1">Final Patient Diagnosis</p>
              <h2 className="text-4xl font-bold flex items-center gap-3">
                {summary.diagnosis === 'Cancer' ? <AlertTriangle size={36}/> : <CheckCircle size={36}/>}
                {summary.diagnosis}
              </h2>
              <p className="mt-2 text-sm opacity-80">
                {summary.positive_scans} out of {summary.scan_count} scans indicated cancer.
                Confidence: {(summary.confidence * 100).toFixed(2)}%
              </p>
            </div>
            <div className="text-right hidden sm:block">
               <Activity size={48} className="opacity-20"/>
            </div>
          </div>

          {/* --- INDIVIDUAL RESULTS --- */}
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Layers className="text-accent"/> Individual Scan Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((res, index) => (
              <div key={index} className="flex flex-col gap-4">
                <PredictionResult result={res} />
                <div className="bg-white p-2 rounded-xl shadow-md border border-slate-100">
                  <div className="relative overflow-hidden rounded-lg group">
                    <img src={res.heatmap} alt="GradCAM" className="w-full h-40 object-cover" />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
                      Slice {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default Predict;