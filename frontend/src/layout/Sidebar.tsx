import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import {
    ChevronLeft,
    ExpandLess,
    ExpandMore,
    Logout,
    People,
} from "@mui/icons-material";

import { navigation } from "./navigation";
import { SIDEBAR_WIDTH } from "../theme/constants";
import AppLogo from "../components/ui/AppLogo";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
    const location = useLocation();
    const { mode } = useThemeContext();
    const { user, logout } = useAuth();

    const DashboardIcon = navigation[0].icon as any;
    const AdministrationIcon = navigation[5]?.icon as any;

    const [openArchitecture, setOpenArchitecture] = useState(true);
    const [openRelationships, setOpenRelationships] = useState(true);

    const sectionButtonSx = {
        minHeight: 38,
        px: 2,
        mx: 1.5,
        mt: 1,
        borderRadius: "8px",
        color: "text.secondary",
        "&:hover": {
            backgroundColor: "action.hover",
            color: "text.primary",
        },
        "& .MuiListItemText-primary": {
            fontWeight: 700,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
        },
        "& .MuiSvgIcon-root": {
            color: "text.disabled",
            fontSize: 18,
        },
    };

    const navigationButtonSx = {
        minHeight: 40,
        mx: 1.5,
        mb: 0.5,
        px: 1.75,
        borderRadius: "8px",
        transition: "all 0.15s ease-in-out",
        "& .MuiListItemIcon-root": {
            minWidth: 34,
            "& .MuiSvgIcon-root": {
                fontSize: 20,
            },
        },
        "& .MuiListItemText-primary": {
            fontSize: 13.5,
        },
    };

    // Filter architecture children based on role
    const getFilteredArchitecture = () => {
        if (!navigation[1]?.children) return [];
        const items = navigation[1].children;
        if (user?.role === 'SYSTEM_ADMIN') return items;
        if (user?.role === 'APPLICATION_ADMIN') return items.filter(i => i.title === 'Applications');
        if (user?.role === 'TECHNOLOGY_ADMIN') return items.filter(i => i.title === 'Technologies');
        if (user?.role === 'BUSINESS_ADMIN') return items.filter(i => i.title === 'Capabilities');
        if (user?.role === 'PROCESS_ADMIN') return items.filter(i => i.title === 'Processes');
        return [];
    };

    const filteredArchitecture = getFilteredArchitecture();

    return (
        <Box
            sx={{
                width: open ? SIDEBAR_WIDTH : 0,
                height: "100vh",
                bgcolor: "background.paper",
                borderRight: open ? 1 : 0,
                borderColor: "divider",
                overflowX: "hidden",
                overflowY: "auto",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                "&::-webkit-scrollbar": {
                    width: 5,
                },
                "&::-webkit-scrollbar-track": {
                    background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: mode === 'light' ? "#CBD5E1" : "#475569",
                    borderRadius: 10,
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    height: 64,
                    px: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderColor: "divider",
                    flexShrink: 0,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
                    <AppLogo />
                </Box>

                {open && (
                    <IconButton
                        onClick={onToggle}
                        size="small"
                        sx={{
                            color: "text.secondary",
                            borderRadius: "6px",
                            "&:hover": {
                                backgroundColor: "action.hover",
                                color: "text.primary",
                            },
                        }}
                    >
                        <ChevronLeft fontSize="small" />
                    </IconButton>
                )}
            </Box>

            {/* Navigation List */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <List sx={{ py: 1.5 }}>
                    {user?.role === 'SYSTEM_ADMIN' && (
                        <>
                            {/* Dashboard */}
                            <ListItemButton
                                component={Link}
                                to="/dashboard"
                                selected={location.pathname === "/dashboard"}
                                sx={navigationButtonSx}
                            >
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </>
                    )}

                    {/* Architecture */}
                    {filteredArchitecture.length > 0 && (
                        <>
                            <ListItemButton
                                onClick={() => setOpenArchitecture(!openArchitecture)}
                                sx={sectionButtonSx}
                            >
                                <ListItemText primary="Architecture" />
                                {openArchitecture ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={openArchitecture} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {filteredArchitecture.map((item: any) => {
                                        const Icon = item.icon;
                                        return (
                                            <ListItemButton
                                                key={item.title}
                                                component={Link}
                                                to={item.path ?? "#"}
                                                selected={location.pathname === item.path}
                                                sx={{
                                                    ...navigationButtonSx,
                                                    pl: 3.5,
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Icon />
                                                </ListItemIcon>
                                                <ListItemText primary={item.title} />
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </>
                    )}

                    {user?.role === 'SYSTEM_ADMIN' && (
                        <>
                            {/* Relationships */}
                            <ListItemButton
                                onClick={() => setOpenRelationships(!openRelationships)}
                                sx={sectionButtonSx}
                            >
                                <ListItemText primary="Relationships" />
                                {openRelationships ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={openRelationships} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {navigation[2]?.children?.map((item: any) => {
                                        const Icon = item.icon;
                                        return (
                                            <ListItemButton
                                                key={item.title}
                                                component={Link}
                                                to={item.path ?? "#"}
                                                selected={location.pathname === item.path}
                                                sx={{
                                                    ...navigationButtonSx,
                                                    pl: 3.5,
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Icon />
                                                </ListItemIcon>
                                                <ListItemText primary={item.title} />
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </Collapse>

                        
                            {/* Administration */}
                            <ListItemButton
                                onClick={() => {}}
                                sx={sectionButtonSx}
                            >
                                <ListItemText primary="Administration" />
                            </ListItemButton>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to="/administration"
                                    selected={location.pathname === "/administration"}
                                    sx={{
                                        ...navigationButtonSx,
                                        pl: 3.5,
                                    }}
                                >
                                    <ListItemIcon>
                                        {AdministrationIcon && <AdministrationIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>

                                <ListItemButton
                                    component={Link}
                                    to="/users"
                                    selected={location.pathname === "/users"}
                                    sx={{
                                        ...navigationButtonSx,
                                        pl: 3.5,
                                    }}
                                >
                                    <ListItemIcon>
                                        <People />
                                    </ListItemIcon>
                                    <ListItemText primary="User Management" />
                                </ListItemButton>
                            </List>
                        </>
                    )}
                </List>
            </Box>

            {/* Logout button at the bottom */}
            <Box sx={{ p: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <ListItemButton onClick={logout} sx={navigationButtonSx}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </Box>
        </Box>
    );
}