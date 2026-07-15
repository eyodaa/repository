import {
    Box,
    Grid,
    Typography,
} from "@mui/material";

import KpiCard from "../../components/dashboard/KpiCard";

export default function DashboardPage() {

    return (

        <Box>

            <Typography
                sx={{ mb: 1 }}
                color="text.secondary"
            >
                Dashboard
            </Typography>

            <Typography
                sx={{ mb: 4 }}
                color="text.secondary"
            >
                Enterprise Architecture Repository Overview
            </Typography>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                    <KpiCard
                        title="Applications"
                        value={124}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                    <KpiCard
                        title="Technologies"
                        value={68}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                    <KpiCard
                        title="Capabilities"
                        value={93}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                    <KpiCard
                        title="Processes"
                        value={41}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                    <KpiCard
                        title="Relationships"
                        value={1043}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                    <KpiCard
                        title="Avg Health"
                        value="3.9"
                        color="#2e7d32"
                    />
                </Grid>

            </Grid>

        </Box>

    );

}