import { useState } from "react";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useThemeContext } from "../theme/ThemeContextProvider";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { mode } = useThemeContext();

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                bgcolor: "background.default",
            }}
        >
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onToggle={handleToggleSidebar} />

            {/* Main Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    bgcolor: "background.default",
                }}
            >
                {/* Top Bar */}
                <Topbar sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />

                {/* Workspace Canvas */}
                <Box
                    component="main"
                    sx={{
                        position: "relative",
                        flexGrow: 1,
                        minWidth: 0,
                        overflow: "auto",
                        p: { xs: 2.5, sm: 3.5, md: 4 },
                        backgroundColor: "background.default",
                        backgroundImage: mode === 'light' ? `
                            radial-gradient(circle at 15% 0%, rgba(37, 99, 235, 0.04) 0%, transparent 40%),
                            radial-gradient(circle at 85% 20%, rgba(14, 165, 233, 0.03) 0%, transparent 35%)
                        ` : `
                            radial-gradient(circle at 15% 0%, rgba(37, 99, 235, 0.12) 0%, transparent 40%),
                            radial-gradient(circle at 85% 20%, rgba(14, 165, 233, 0.08) 0%, transparent 35%)
                        `,
                        "& > *": {
                            position: "relative",
                            zIndex: 1,
                        },
                        "&::-webkit-scrollbar": {
                            width: 6,
                            height: 6,
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "transparent",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: mode === 'light' ? "#CBD5E1" : "#475569",
                            borderRadius: 4,
                            "&:hover": {
                                background: mode === 'light' ? "#94A3B8" : "#64748B",
                            },
                        },
                        scrollbarColor: mode === 'light' ? "#CBD5E1 transparent" : "#475569 transparent",
                        scrollbarWidth: "thin",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}