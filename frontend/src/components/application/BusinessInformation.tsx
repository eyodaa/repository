import {
    Paper,
    Typography,
    Grid,
    Chip,
} from "@mui/material";
import type { Application } from "../../types/application";

interface BusinessInformationProps {
    application: Application;
}

export default function BusinessInformation({ application }: BusinessInformationProps) {
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                }}
            >
                Business Information
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Business Owner
                    </Typography>
                    <Typography>
                        {application.businessOwner || "N/A"}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Support Group
                    </Typography>
                    <Typography>
                        {application.supportGroup || "N/A"}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Function
                    </Typography>
                    <Typography>
                        {application.function || "N/A"}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Environment
                    </Typography>
                    <Typography>
                        {application.environment || "N/A"}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 3,
                            mt: 2
                        }}
                    >
                        Supported Capabilities
                    </Typography>
                    <Chip label="Core Banking" sx={{ mr: 1, mb: 1 }} />
                    <Chip label="Customer Management" sx={{ mr: 1, mb: 1 }} />
                </Grid>
            </Grid>
        </Paper>
    );
}