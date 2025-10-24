import React from 'react';
import { Search, Bell, MessageCircle, Menu, ChevronDown } from 'lucide-react';

const SuperAdminHeader = ({ onMenuToggle }) => {
    return (
        <header className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMenuToggle}
                        className="lg:hidden p-2 rounded hover:bg-gray-100"
                    >
                        <Menu size={20} />
                    </button>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Welcome,</h2>
                        <p className="text-sm text-gray-500">24th April,2025 | 11:11 AM</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:block relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>

                    <button className="p-2 rounded-full hover:bg-gray-100 relative">
                        <MessageCircle size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 relative">
                        <Bell size={20} className="text-gray-600" />
                    </button>

                    <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            LS
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-gray-700">Leena Singh</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SuperAdminHeader;
