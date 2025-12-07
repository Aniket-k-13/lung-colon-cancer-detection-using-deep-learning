import React, { useEffect, useState } from 'react';
import { getMetrics, getPatients } from '../services/api';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Activity, Users, AlertCircle, CheckCircle, 
  Target, Zap, Award // Imported new icons for metrics
} from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, patientsRes] = await Promise.all([
          getMetrics(),
          getPatients()
        ]);
        setMetrics(metricsRes.data);
        setPatients(patientsRes.data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        <Activity className="animate-spin mr-2" /> Loading Analytics...
      </div>
    );
  }

  // --- Calculate Real-Time Stats ---
  const totalScans = patients.length;
  const metastaticCount = patients.filter(p => p.diagnosis === "Cancer").length;
  const healthyCount = patients.filter(p => p.diagnosis === "Non-Cancer").length;
  
  // Data for Pie Chart
  const distributionData = [
    { name: 'Cancer', value: metastaticCount },
    { name: 'Non-Cancer', value: healthyCount },
  ];
  const COLORS = ['#ef4444', '#10b981']; 

  // Data for Line Chart
  const trainingData = metrics?.loss_curve?.map((val, i) => ({
    epoch: i + 1,
    loss: val,
    acc: metrics.acc_curve[i]
  })) || [];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-2">Analytics Dashboard</h1>
      <p className="text-slate-500 mb-8">Live overview of patient screenings and model performance.</p>
      
      {/* SECTION 1: LIVE PATIENT STATISTICS */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Patient Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Screenings" 
          value={totalScans} 
          icon={<Users size={24} className="text-blue-600" />} 
          bg="bg-blue-50" 
        />
        <StatCard 
          title="Cancer Detected" 
          value={metastaticCount} 
          icon={<AlertCircle size={24} className="text-red-600" />} 
          bg="bg-red-50" 
        />
        <StatCard 
          title="Non-Cancer " 
          value={healthyCount} 
          icon={<CheckCircle size={24} className="text-green-600" />} 
          bg="bg-green-50" 
        />
      </div>

      {/* SECTION 2: MODEL PERFORMANCE METRICS */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Model Evaluation Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Accuracy" 
          value={`${(metrics?.accuracy * 100).toFixed(1)}%`} 
          icon={<Activity size={24} className="text-purple-600" />} 
          bg="bg-purple-50" 
        />
        <StatCard 
          title="Precision" 
          value={`${(metrics?.precision * 100).toFixed(1)}%`} 
          icon={<Target size={24} className="text-indigo-600" />} 
          bg="bg-indigo-50" 
        />
        <StatCard 
          title="Recall" 
          value={`${(metrics?.recall * 100).toFixed(1)}%`} 
          icon={<Zap size={24} className="text-orange-600" />} 
          bg="bg-orange-50" 
        />
        <StatCard 
          title="F1 Score" 
          value={`${(metrics?.f1_score * 100).toFixed(1)}%`} 
          icon={<Award size={24} className="text-teal-600" />} 
          bg="bg-teal-50" 
        />
      </div>

      {/* SECTION 3: CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Disease Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-6">Patient Diagnosis Distribution</h3>
          <div className="h-72 w-full">
            {totalScans > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <p>No patient data available yet.</p>
                <a href="/predict" className="text-accent text-sm mt-2 hover:underline">Start a diagnosis</a>
              </div>
            )}
          </div>
        </div>

        {/* Training Performance Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-6">Model Training History</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={3} dot={false} name="Loss" />
                <Line type="monotone" dataKey="acc" stroke="#3b82f6" strokeWidth={3} dot={false} name="Accuracy" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component for Cards
const StatCard = ({ title, value, icon, bg }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h2 className="text-3xl font-bold text-slate-800">{value}</h2>
    </div>
    <div className={`p-4 rounded-full ${bg}`}>
      {icon}
    </div>
  </div>
);

export default Dashboard;