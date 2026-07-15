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
} from "@mui/icons-material";

interface TopbarProps {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function Topbar({
    sidebarOpen,
    onToggleSidebar,
}: TopbarProps) {
    return (
        <AppBar
            position="static"
            elevation={0}
            color="inherit"
            sx={{
                borderBottom: "1px solid #E5E7EB",
            }}
        >
            <Toolbar>

                {/* Sidebar Toggle */}

                <IconButton
                    edge="start"
                    onClick={onToggleSidebar}
                    sx={{ mr: 2 }}
                >
                    {sidebarOpen ? <MenuOpen /> : <Menu />}
                </IconButton>

                {/* Title */}

                <Typography
                    variant="h5"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                    }}
                >
                    Enterprise Dashboard
                </Typography>

                {/* Search */}

                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 2,
                        py: 0.5,
                        width: 320,
                        mr: 3,
                        border: "1px solid #E5E7EB",
                        borderRadius: 3,
                    }}
                >
                    <Search
                        sx={{
                            color: "text.secondary",
                            mr: 1,
                        }}
                    />

                    <InputBase
                        placeholder="Search applications..."
                        fullWidth
                    />
                </Paper>

                {/* Notifications */}

                <IconButton>
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
                        ml: 3,
                        gap: 1,
                    }}
                >
                    <Avatar>D</Avatar>

                    <Box>
                        <Typography
                            variant="body2"

                        >
                            Danayt
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Enterprise Architect
                        </Typography>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    );
}