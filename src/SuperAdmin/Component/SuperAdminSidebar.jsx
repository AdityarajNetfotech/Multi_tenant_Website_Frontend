import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  UserPlus,
  Building2,
  Settings,
  User,
  Ticket,
  LogOut,
  X
} from 'lucide-react';

const SuperAdminSidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeSubNav, setActiveSubNav] = useState('');

  const handleNavClick = (name, path) => {
    setActiveNav(name);
    setActiveSubNav('');
    navigate(path);
  };

  const handleSubNavClick = (name, path) => {
    setActiveSubNav(name);
    navigate(path);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`
          fixed left-0 top-0 h-screen bg-gray-900 text-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 w-64 flex flex-col
        `}
      >
        <div className="flex items-center justify-between py-6 px-7 border-b border-gray-700">
          <h1 className="text-xl font-bold">AIRecruit</h1>
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-gray-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="py-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNavClick('Dashboard', '/RecruiterAdmin-Dashboard')}
                className={`flex w-full items-center space-x-3 py-2 px-7 rounded transition-colors 
                  ${activeNav === 'Dashboard' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavClick('Companies', '/SuperAdmin-Dashboard/Companies')}
                className={`flex w-full items-center space-x-3 py-2 px-7 rounded transition-colors 
                  ${activeNav === 'Companies' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              >
                <UserPlus size={20} />
                <span>Companies</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavClick('Tickets', '/SuperAdmin-Dashboard/Tickets')}
                className={`flex w-full items-center space-x-3 py-2 px-7 rounded transition-colors 
                  ${activeNav === 'Tickets' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              >
                <UserPlus size={20} />
                <span>Tickets</span>
              </button>
            </li>


            <li>
              <button
                onClick={() => handleNavClick('RejisteredRecruiters', '/SuperAdmin-Dashboard/RejisteredRecruiters')}
                className={`flex w-full items-center space-x-3 py-2 px-7 rounded transition-colors 
                  ${activeNav === 'RejisteredRecruiters' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              >
                <Building2 size={20} />
                <span>Recently Rejistered</span>
              </button>
            </li>


            <li>
              <button
                onClick={() => handleNavClick('Profile', '/SuperAdmin-Dashboard/Profile')}
                className={`flex w-full items-center space-x-3 py-2 px-7 rounded transition-colors 
                  ${activeNav === 'Profile' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              >
                <Building2 size={20} />
                <span>Profile</span>
              </button>
            </li>


            <li>
              <button
                onClick={() => handleNavClick('Logout', '/logout')}
                className={`flex w-full items-center space-x-3 py-2 px-7 rounded transition-colors 
                  ${activeNav === 'Logout' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SuperAdminSidebar;
