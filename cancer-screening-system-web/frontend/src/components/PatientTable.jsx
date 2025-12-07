import React, { useState, useEffect } from 'react';
import { Search, FileText, ArrowUpDown, Filter } from 'lucide-react';
import { getPatients } from '../services/api'; // Import API

const PatientTable = () => {
  const [patients, setPatients] = useState([]); // State for real data
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fetch Data on Load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Filter Logic
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting Logic
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Filter size={20} className="text-accent"/> Patient Database
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search name..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 w-64 text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">Name <ArrowUpDown size={14}/></div>
              </th>
              <th className="p-4 font-semibold">Age / Gender</th>
              <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1">Date <ArrowUpDown size={14}/></div>
              </th>
              <th className="p-4 font-semibold">Diagnosis</th>
              <th className="p-4 font-semibold">Confidence</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 divide-y divide-slate-100">
            {sortedPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-blue-50/50 transition">
                <td className="p-4 font-medium text-slate-900">{patient.name}</td>
                <td className="p-4 text-sm text-slate-500">{patient.age} / {patient.gender}</td>
                <td className="p-4 text-sm text-slate-500">{patient.date}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    patient.diagnosis === "Cancer" 
                      ? "bg-red-50 text-red-600 border-red-100" 
                      : "bg-emerald-50 text-emerald-600 border-emerald-100"
                  }`}>
                    {patient.diagnosis}
                  </span>
                </td>
                <td className="p-4 text-sm font-semibold">
                  {(patient.confidence * 100).toFixed(0)}%
                </td>
              </tr>
            ))}
            {sortedPatients.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-400">
                  No records found. Start a new diagnosis to see data here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;
