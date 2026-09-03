import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    InputBase,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";

import {
    NotificationsNone,
    Search,
    Menu,
    MenuOpen,
    LightMode,
    DarkMode,
} from "@mui/icons-material";
import { useThemeContext } from "../theme/ThemeContextProvider";

interface TopbarProps {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function Topbar({
    sidebarOpen,
    onToggleSidebar,
}: TopbarProps) {
    const { mode, toggleTheme } = useThemeContext();

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

                {/* Search */}

                <Paper
                    elevation={0}
                    sx={{
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        alignItems: "center",

                        px: 1.5,
                        py: 0.5,

                        width: {
                            sm: 260,
                            md: 360,
                        },

                        height: 44,

                        mr: {
                            sm: 1,
                            md: 2,
                        },

                        bgcolor: "background.paper",

                        border: 1,
                        borderColor: "divider",

                        borderRadius: "24px",

                        boxShadow:
                            mode === 'light' ? "0 2px 6px rgba(15, 23, 42, 0.04)" : "0 2px 6px rgba(0,0,0,0.2)",

                        "&:focus-within": {
                            borderColor: "primary.light",
                            boxShadow:
                                "0 0 0 3px rgba(37, 99, 235, 0.08)",
                        },
                    }}
                >
                    <Search
                        sx={{
                            color: "text.secondary",
                            mr: 1,
                            fontSize: 24,
                        }}
                    />

                    <InputBase
                        placeholder="Search applications..."
                        fullWidth
                        sx={{
                            color: "text.primary",

                            "& input::placeholder": {
                                color: "text.disabled",
                                opacity: 1,
                            },
                        }}
                    />
                </Paper>

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
                        D
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
                            Danayt
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: "text.secondary",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Enterprise Architect
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}