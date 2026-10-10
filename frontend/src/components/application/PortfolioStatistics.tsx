import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";

import { useApplications } from "../../hooks/useApplications";
import { useEffect, useState } from "react";
import { applicationService } from "../../services/applicationService";

export default function PortfolioStatistics() {

    const {
        applications,
        loading,
    } = useApplications();
    const [totalCost, setTotalCost] = useState<number>(0);
    useEffect(() => {
        applicationService.getTotalCost()
            .then(res => {
                setTotalCost(res.data);
            })
            .catch(console.error);
    }, []);
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 3,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    const totalApplications = applications.length;

    const activeApplications = applications.filter(
        app => app.lifecycleStatus === "Active"
    ).length;

    const statistics = [
        {
            title: "Applications",
            value: totalApplications,
            color: "#1976d2",
        },
        {
            title: "Active",
            value: activeApplications,
            color: "#2e7d32",
        },
        {
            title: "Average Health",
            value: "N/A",
            color: "#ed6c02",
        },
        {
            title: "Annual TCO",
            value: `£${Number(totalCost).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
            color: "#7b1fa2",
        },
    ];

    return (
        <Grid container spacing={3}>
            {statistics.map((item) => (
                <Grid
                    key={item.title}
                    size={{ xs: 12, sm: 6, md: 3 }}
                >
                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            height: 130,
                        }}
                    >
                        <CardContent>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {item.title}
                            </Typography>

                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: item.color,
                                        fontWeight: 700,
                                    }}
                                >
                                    {item.value}
                                </Typography>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}