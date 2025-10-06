import React, { useState } from "react";
import RecruiterSidebar from "./Component/RecruiterSidebar";
import RecruiterHeader from "./Component/RecruiterHeader";
import { Outlet } from "react-router-dom";

const SuperAdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex relative">
            <RecruiterSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

            <div className="hidden lg:block w-64 flex-shrink-0" />

            <div className="flex-1 flex flex-col min-w-0">
                <RecruiterHeader onMenuToggle={toggleSidebar} />

                <main className="p-4 lg:p-6 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;