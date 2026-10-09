import { Box, Typography, Breadcrumbs, Link } from "@mui/material";

import UserManagement from "../../components/admin/UserManagement";
import AuditLogViewer from "../../components/admin/AuditLogViewer";

export default function AdminPage() {
    return (
        <Box sx={{ p: 4 }}>
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link underline="hover" href="/">
                    Home
                </Link>
                <Typography color="text.primary">
                    Admin
                </Typography>
            </Breadcrumbs>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 4,
                }}
            >
                Admin Console
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <UserManagement />
                </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
                <AuditLogViewer />
            </Box>
        </Box>
    );
}
