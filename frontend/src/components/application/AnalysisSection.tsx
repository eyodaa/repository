import {
    Paper,
    Typography,
    Button,
    Box,
    Grid,
    Chip,
    CircularProgress,
    Alert,
    Divider,
} from "@mui/material";

import AnalyticsIcon from "@mui/icons-material/Analytics";

import { useEffect, useState } from "react";

import { applicationService } from "../../services/applicationService";

import type { ApplicationAnalysisResponse } from "../../types/analysis";

interface AnalysisSectionProps {
    applicationId: number;
    refreshTrigger: number;
}

export default function AnalysisSection({
    applicationId,
    refreshTrigger,
}: AnalysisSectionProps) {

    const [analysis, setAnalysis] =
        useState<ApplicationAnalysisResponse | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function fetchAnalysis() {

        setLoading(true);
        setError("");

        try {

            const response =
                await applicationService.getAnalysis(applicationId);

            setAnalysis(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Analysis not available. Please complete an assessment first."
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchAnalysis();

    }, [applicationId, refreshTrigger]);

    const getPassColor = (passed: boolean) =>
        passed ? "success.main" : "error.main";

    const getDispositionColor = (
        disposition?: string
    ): "success" | "primary" | "warning" | "error" | "default" => {

        switch (disposition) {

            case "INVEST":
                return "success";

            case "TOLERATE":
                return "primary";

            case "MIGRATE":
                return "warning";

            case "ELIMINATE":
                return "error";

            default:
                return "default";
        }

    };

    const getPriorityColor = (
        priority?: string
    ): "success" | "warning" | "error" | "default" => {

        switch (priority) {

            case "HIGH":
            case "CRITICAL":
                return "error";

            case "MEDIUM":
                return "warning";

            case "LOW":
                return "success";

            default:
                return "default";
        }

    };

    return (

        <Paper
            sx={{
                mt: { xs: 3, lg: 0 },
                p: 3,
                borderRadius: 3,
                height: "100%",
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >

                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700 }}
                >
                    Application Analysis
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AnalyticsIcon />}
                    onClick={fetchAnalysis}
                    disabled={loading}
                >
                    Refresh
                </Button>

            </Box>

            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 5,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            {!loading && error && (
                <Alert severity="info">
                    {error}
                </Alert>
            )}

            {!loading && !error && analysis && (

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography color="text.secondary">
                            Disposition
                        </Typography>

                        <Chip
                            sx={{ mt: 1 }}
                            label={analysis.disposition}
                            color={getDispositionColor(analysis.disposition)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography color="text.secondary">
                            Priority
                        </Typography>

                        <Chip
                            sx={{ mt: 1 }}
                            label={analysis.priority}
                            color={getPriorityColor(analysis.priority)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography color="text.secondary">
                            Organizational Value
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                color: getPassColor(
                                    analysis.organizationalPass
                                ),
                            }}
                        >
                            {analysis.organizationalValue.toFixed(2)}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography color="text.secondary">
                            Technical Health
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                color: getPassColor(
                                    analysis.technicalPass
                                ),
                            }}
                        >
                            {analysis.technicalHealth.toFixed(2)}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography color="text.secondary">
                            End User Perspective
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                color: getPassColor(
                                    analysis.endUserPass
                                ),
                            }}
                        >
                            {analysis.endUserPerspective.toFixed(2)}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography color="text.secondary">
                            Total Cost of Ownership
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                color: getPassColor(
                                    analysis.tcoPass
                                ),
                            }}
                        >
                            {analysis.totalCostOwnership.toFixed(2)}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography color="text.secondary">
                            Identified Pattern
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                fontWeight: 500,
                            }}
                        >
                            {analysis.pattern}
                        </Typography>
                    </Grid>

                </Grid>

            )}

            {!loading && !error && !analysis && (
                <Alert severity="warning">
                    No analysis available.
                </Alert>
            )}

        </Paper>

    );

}