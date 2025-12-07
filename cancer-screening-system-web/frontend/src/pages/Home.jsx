import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Activity } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          v2.0 Model Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
          AI-Powered <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Lung Cancer Detection
          </span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Utilizing Hybrid EfficientNet-B0 architecture to provide instant, highly accurate Cancer screenings with explainable AI heatmaps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/predict" 
            className="group flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1"
          >
            Start Diagnosis <ArrowRight className="group-hover:translate-x-1 transition" />
          </Link>
          <Link 
            to="/dashboard" 
            className="px-8 py-4 rounded-xl font-bold text-lg text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
          >
            View Analytics
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Zap className="text-yellow-500" />}
          title="Instant Inference"
          desc="Optimized PyTorch model delivers results in milliseconds using CPU-efficient processing."
        />
        <FeatureCard 
          icon={<ShieldCheck className="text-emerald-500" />}
          title="Secure Records"
          desc="Patient data is securely logged with history tracking for medical review."
        />
        <FeatureCard 
          icon={<Activity className="text-blue-500" />}
          title="Explainable AI"
          desc="Grad-CAM visualization highlights the exact tissue regions influencing the diagnosis."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default Home;