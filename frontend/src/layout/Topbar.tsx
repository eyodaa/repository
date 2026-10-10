import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";

import {
    NotificationsNone,
    Menu,
    MenuOpen,
    LightMode,
    DarkMode,
} from "@mui/icons-material";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { useAuth } from "../context/AuthContext";

interface TopbarProps {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function Topbar({
    sidebarOpen,
    onToggleSidebar,
}: TopbarProps) {
    const { mode, toggleTheme } = useThemeContext();
    const { user } = useAuth();

    return (
        <AppBar
            position="static"
            elevation={0}
            color="inherit"
            sx={{
                bgcolor: "background.paper",
                color: "text.primary",
                borderBottom: 1,
                borderColor: "divider",
                flexShrink: 0,
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "72px !important",
                    px: {
                        xs: 2,
                        md: 3,
                    },
                }}
            >
                {/* Sidebar Toggle */}

                <IconButton
                    edge="start"
                    onClick={onToggleSidebar}
                    sx={{
                        mr: 2,
                        color: "text.secondary",

                        "&:hover": {
                            backgroundColor: "action.hover",
                            color: "primary.main",
                        },
                    }}
                >
                    {sidebarOpen ? <MenuOpen /> : <Menu />}
                </IconButton>

                {/* Title */}

                <Typography
                    variant="h5"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                        color: "text.primary",
                        fontSize: {
                            xs: "1.2rem",
                            md: "1.7rem",
                        },
                    }}
                >
                    Enterprise Dashboard
                </Typography>
                {/* Theme Toggle */}
                <IconButton
                    onClick={toggleTheme}
                    sx={{
                        color: "text.secondary",
                        mr: 1,
                        "&:hover": {
                            backgroundColor: "action.hover",
                            color: "primary.main",
                        },
                    }}
                >
                    {mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>

                {/* Notifications */}

                <IconButton
                    sx={{
                        color: "text.secondary",

                        "&:hover": {
                            backgroundColor: "action.hover",
                            color: "primary.main",
                        },
                    }}
                >
                    <Badge
                        color="error"
                        badgeContent={4}
                    >
                        <NotificationsNone />
                    </Badge>
                </IconButton>

                {/* User */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        ml: {
                            xs: 1,
                            md: 2,
                        },
                        gap: 1.2,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 42,
                            height: 42,
                            bgcolor: mode === 'light' ? "#DBEAFE" : "#1E3A8A",
                            color: mode === 'light' ? "#1D4ED8" : "#93C5FD",
                            fontWeight: 600,
                        }}
                    >
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block",
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                lineHeight: 1.3,
                            }}
                        >
                            {user?.username || 'Guest'}
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: "text.secondary",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {user?.role?.replace('_', ' ') || 'No Role'}
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}