import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Topbar 
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                <Box
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: "#F5F7FA",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}