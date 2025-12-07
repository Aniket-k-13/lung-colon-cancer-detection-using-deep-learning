import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, ScanLine, Users } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition">
            <Activity className="text-accent h-6 w-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
            LungScan
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-1">
          <NavItem to="/" icon={null} label="Home" active={isActive("/")} />
          <NavItem to="/predict" icon={<ScanLine size={18}/>} label="Analysis" active={isActive("/predict")} />
          <NavItem to="/dashboard" icon={<LayoutDashboard size={18}/>} label="Dashboard" active={isActive("/dashboard")} />
          <NavItem to="/patients" icon={<Users size={18}/>} label="Patients" active={isActive("/patients")} />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
      ${active 
        ? 'bg-primary text-white shadow-md shadow-primary/20 translate-y-[-1px]' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;