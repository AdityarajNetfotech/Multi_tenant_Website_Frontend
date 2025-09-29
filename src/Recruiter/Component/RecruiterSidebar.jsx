import React from 'react';
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

const RecruiterSidebar = ({ isOpen, onToggle }) => {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed left-0 top-0 h-screen bg-gray-900 text-white z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 w-64 flex flex-col
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between py-6 px-7 border-b border-gray-700">
                    <h1 className="text-xl font-bold">AIRecruit</h1>
                    <button
                        onClick={onToggle}
                        className="p-1 rounded hover:bg-gray-700 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="py-4 flex-1 overflow-y-auto">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="flex items-center space-x-3 py-2 px-7 rounded hover:bg-white hover:text-black transition-colors">
                                <Home size={20} />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center space-x-3 py-2 px-7 rounded hover:bg-white hover:text-black transition-colors">
                                <UserPlus size={20} />
                                <span>Register</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center space-x-3 py-2 px-7 rounded hover:bg-gray-700 transition-colors">
                                <Building2 size={20} />
                                <span>Companies</span>
                            </a>
                        </li>
                        <li className="space-y-1">
                            <div className="flex items-center space-x-3 py-2 px-7 rounded bg-white text-black">
                                <Settings size={20} />
                                <span>System Settings</span>
                            </div>
                            <ul className="space-y-1 w-36 mx-auto">
                                <li>
                                    <a href="#" className="flex justify-center items-center space-x-3 py-1 bg-gray-400 rounded-3xl text-black transition-colors">
                                        <User size={16} />
                                        <span className="text-sm">Edit Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="flex items-center space-x-3 py-2 px-7 rounded hover:bg-white hover:text-black transition-colors">
                                <Ticket size={20} />
                                <span>Ticket</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center space-x-3 py-2 px-7 rounded hover:bg-white hover:text-black transition-colors">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default RecruiterSidebar;