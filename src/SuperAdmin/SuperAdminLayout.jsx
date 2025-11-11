import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./Component/SuperAdminSidebar";
import SuperAdminHeader from "./Component/SuperAdminHeader";

const SuperAdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen flex relative">
            <SuperAdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

            <div className="hidden lg:block w-64 flex-shrink-0" />

            <div className="flex-1 flex flex-col min-w-0">
                <SuperAdminHeader onMenuToggle={toggleSidebar} />

                <main className="p-4 lg:p-6 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;