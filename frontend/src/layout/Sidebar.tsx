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
} from "@mui/material";
import {
    ChevronLeft,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";

import { navigation } from "./navigation";
import { SIDEBAR_WIDTH } from "../theme/constants";
import AppLogo from "../components/ui/AppLogo";
import { useThemeContext } from "../theme/ThemeContextProvider";

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
    const location = useLocation();
    const { mode } = useThemeContext();

    const DashboardIcon = navigation[0].icon as any;
    const ReportsIcon = navigation[4]?.icon as any;
    const AdministrationIcon = navigation[5]?.icon as any;

    const [openArchitecture, setOpenArchitecture] = useState(true);
    const [openRelationships, setOpenRelationships] = useState(true);
    const [openAnalytics, setOpenAnalytics] = useState(true);

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
            <List sx={{ py: 1.5 }}>
                {/* Dashboard */}
                <ListItemButton
                    component={Link}
                    to="/"
                    selected={location.pathname === "/"}
                    sx={navigationButtonSx}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                {/* Architecture */}
                <ListItemButton
                    onClick={() => setOpenArchitecture(!openArchitecture)}
                    sx={sectionButtonSx}
                >
                    <ListItemText primary="Architecture" />
                    {openArchitecture ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openArchitecture} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navigation[1]?.children?.map((item) => {
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
                        {navigation[2]?.children?.map((item) => {
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

                {/* Analytics */}
                <ListItemButton
                    onClick={() => setOpenAnalytics(!openAnalytics)}
                    sx={sectionButtonSx}
                >
                    <ListItemText primary="Analytics" />
                    {openAnalytics ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openAnalytics} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navigation[3]?.children?.map((item) => {
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

                {/* Reports */}
                <ListItemButton
                    component={Link}
                    to="/reports"
                    selected={location.pathname === "/reports"}
                    sx={navigationButtonSx}
                >
                    <ListItemIcon>
                        {ReportsIcon && <ReportsIcon />}
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItemButton>

                {/* Administration */}
                <ListItemButton
                    component={Link}
                    to="/administration"
                    selected={location.pathname === "/administration"}
                    sx={navigationButtonSx}
                >
                    <ListItemIcon>
                        {AdministrationIcon && <AdministrationIcon />}
                    </ListItemIcon>
                    <ListItemText primary="Administration" />
                </ListItemButton>
            </List>
        </Box>
    );
}