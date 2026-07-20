import { useState } from "react";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                overflow: "hidden",
                bgcolor: "background.default",
            }}
        >
            {/* Sidebar */}
            <Sidebar
                open={sidebarOpen}
                onToggle={handleToggleSidebar}
            />

            {/* Right Side */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* Top Navigation */}
                <Topbar
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={handleToggleSidebar}
                />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        overflow: "auto",

                        background: `
            radial-gradient(
                circle at top,
                #16233A 0%,
                #08111F 80%
            )
        `,

                        p: 4,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}