import {
    Paper,
    Typography,
    Grid,
    Chip,
} from "@mui/material";
import type { Application } from "../../types/application";

interface GeneralInformationProps {
    application: Application;
}

export default function GeneralInformation({ application }: GeneralInformationProps) {
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >
            <Typography variant="h6" sx={{ mb: 3 }}>
                General Information
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Application Code
                    </Typography>
                    <Typography>
                        {application.code || "N/A"}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Owner
                    </Typography>
                    <Typography>
                        {application.technicalOwner || "N/A"}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Vendor
                    </Typography>
                    <Typography>
                        {application.vendor || "N/A"}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Version
                    </Typography>
                    <Typography>
                        {application.version || "N/A"}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Lifecycle
                    </Typography>
                    <Chip
                        label={application.lifecycleStatus || "Unknown"}
                        color={application.lifecycleStatus === 'Active' ? 'success' : 'default'}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">
                        Criticality
                    </Typography>
                    <Chip
                        label={application.businessCriticality || "Unknown"}
                        color={application.businessCriticality === 'High' ? 'error' : 'default'}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}