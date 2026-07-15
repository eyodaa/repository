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

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { navigation } from "./navigation";
import { SIDEBAR_WIDTH } from "../theme/constants";
import AppLogo from "../components/ui/AppLogo";

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {

    const location = useLocation();

    const DashboardIcon = navigation[0].icon;
    const ReportsIcon = navigation[4]?.icon;
    const AdministrationIcon = navigation[5]?.icon;

    const [openArchitecture, setOpenArchitecture] = useState(true);
    const [openRelationships, setOpenRelationships] = useState(true);
    const [openAnalytics, setOpenAnalytics] = useState(true);

    return (
        <Box
            sx={{
                width: open ? SIDEBAR_WIDTH : 0,
                height: "100vh",
                bgcolor: "#ffffff",
                borderRight: open ? "1px solid #e5e7eb" : "0px solid transparent",
                overflowX: "hidden",
                overflowY: "auto",
                flexShrink: 0,
                transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s ease",
            }}
        >
            {/* Logo and Collapse Toggle */}

            <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <AppLogo />
                {open && (
                    <IconButton onClick={onToggle} size="small">
                        <ChevronLeft />
                    </IconButton>
                )}
            </Box>

            <List>

                {/* Dashboard */}

                <ListItemButton
                    component={Link}
                    to="/"
                    selected={location.pathname === "/"}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>

                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                {/* Architecture */}

                <ListItemButton
                    onClick={() => setOpenArchitecture(!openArchitecture)}
                >
                    <ListItemText primary="Architecture" />

                    {openArchitecture ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openArchitecture} timeout="auto">

                    <List component="div" disablePadding>

                        {navigation[1].children?.map((item) => {

                            const Icon = item.icon;

                            return (
                                <ListItemButton
                                    key={item.title}
                                    component={Link}
                                    to={item.path ?? "#"}
                                    selected={location.pathname === item.path}
                                    sx={{ pl: 4 }}
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
                >
                    <ListItemText primary="Relationships" />

                    {openRelationships ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openRelationships} timeout="auto">

                    <List component="div" disablePadding>

                        {navigation[2].children?.map((item) => {

                            const Icon = item.icon;

                            return (
                                <ListItemButton
                                    key={item.title}
                                    component={Link}
                                    to={item.path ?? "#"}
                                    selected={location.pathname === item.path}
                                    sx={{ pl: 4 }}
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
                >
                    <ListItemText primary="Analytics" />

                    {openAnalytics ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openAnalytics} timeout="auto">

                    <List component="div" disablePadding>

                        {navigation[3].children?.map((item) => {

                            const Icon = item.icon;

                            return (
                                <ListItemButton
                                    key={item.title}
                                    component={Link}
                                    to={item.path ?? "#"}
                                    selected={location.pathname === item.path}
                                    sx={{ pl: 4 }}
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