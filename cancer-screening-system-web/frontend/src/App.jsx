import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Predict from './pages/Predict';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients'; // Import the real page

const Home = () => (
    <div className="text-center mt-20 px-4">
        <h1 className="text-5xl font-bold text-primary mb-6">LUNG CANCER DETECTION</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Advanced Hybrid EfficientNet-B0 architecture for early detection and Grad-CAM explainability.
        </p>
        <div className="mt-10 flex justify-center gap-4">
            <a href="/predict" className="bg-accent hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-500/30">
              Start Diagnosis
            </a>
            <a href="/dashboard" className="bg-white border border-slate-200 hover:border-accent text-slate-700 px-8 py-4 rounded-xl font-bold transition">
              View Metrics
            </a>
        </div>
    </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50/50 font-sans pb-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;