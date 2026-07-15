import { Box, Breadcrumbs, Link, Typography, CircularProgress, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Application } from "../../types/application";
import { applicationService } from "../../services/applicationService";

import ApplicationHeader from "../../components/application/ApplicationHeader";
import GeneralInformation from "../../components/application/GeneralInformation";
import BusinessInformation from "../../components/application/BusinessInformation";
import AssessmentSummary from "../../components/application/AssessmentSummary";
import AnalysisSection from "../../components/application/AnalysisSection";

export default function ApplicationDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [assessmentSubmitted, setAssessmentSubmitted] = useState(0);

    useEffect(() => {
        if (!id) return;

        const fetchApplication = async () => {
            setLoading(true);
            try {
                const response = await applicationService.getById(Number(id));
                setApplication(response.data);
                setError("");
            } catch (err: any) {
                console.error(err);
                setError("Failed to fetch application details.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !application) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">{error || "Application not found"}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link underline="hover" href="/applications">
                    Applications
                </Link>

                <Typography color="text.primary">
                    {application.name || id}
                </Typography>
            </Breadcrumbs>

            <ApplicationHeader application={application} />

            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                    <GeneralInformation application={application} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <BusinessInformation application={application} />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                    <AssessmentSummary
                        applicationId={application.id}
                        onAssessmentSubmitted={() => setAssessmentSubmitted(prev => prev + 1)}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <AnalysisSection
                        applicationId={application.id}
                        refreshTrigger={assessmentSubmitted}
                    />
                </Box>
            </Box>
        </Box>
    );
}
