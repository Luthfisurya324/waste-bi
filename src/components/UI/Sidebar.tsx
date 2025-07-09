import React from 'react';
import { Link } from 'react-router-dom';

type SidebarItemProps = {
  to: string;
  icon: string;
  label: string;
  active?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active = false }) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition-colors ${active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <span className="text-xl mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

type SidebarProps = {
  activePage: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const menuItems = [
    { to: '/', icon: '📊', label: 'Dashboard' },
    { to: '/input-truk', icon: '🚛', label: 'Input Data Truk' },
    { to: '/pencacahan', icon: '⚖️', label: 'Pencacahan' },
    { to: '/truk-belum-dicacah', icon: '📋', label: 'Truk Belum Dicacah' },
    { to: '/truk-sudah-dicacah', icon: '✅', label: 'Truk Sudah Dicacah' },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full p-4 flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">🚛 Waste BI</h1>
        <p className="text-sm text-gray-600">Sistem Pencacahan Sampah</p>
      </div>
      
      <div className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={activePage === item.to}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;