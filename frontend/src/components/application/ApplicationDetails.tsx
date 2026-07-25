import {
    Box,
    Breadcrumbs,
    Link,
    Typography,
    CircularProgress,
    Alert,
    Paper,
    Button,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Application } from "../../types/application";

import { applicationService } from "../../services/applicationService";

import ApplicationHeader from "../../components/application/ApplicationHeader";
import GeneralInformation from "../../components/application/GeneralInformation";
import BusinessInformation from "../../components/application/BusinessInformation";
import AssessmentSummary from "../../components/application/AssessmentSummary";
import AnalysisSection from "../../components/application/AnalysisSection";
import ArtifactRelationshipTable from "../../components/application/ArtifactRelationshipTable";

export default function ApplicationDetailsPage() {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [application, setApplication] = useState<Application | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [assessmentSubmitted, setAssessmentSubmitted] = useState(0);

    useEffect(() => {

        if (!id) return;

        loadApplication();

    }, [id]);

    async function loadApplication() {

        setLoading(true);

        try {

            const response = await applicationService.getById(Number(id));

            setApplication(response.data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Failed to fetch application details.");

        } finally {

            setLoading(false);

        }

    }

    async function handleUpdate(updatedApplication: Application) {

        try {

            const response = await applicationService.update(
                updatedApplication.id,
                updatedApplication
            );

            setApplication(response.data);

            return Promise.resolve();

        } catch (err) {

            console.error(err);

            return Promise.reject(err);

        }

    }

    if (loading) {

        return (

            <Box
                sx={{
                    p: 4,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>

        );

    }

    if (error || !application) {

        return (

            <Box sx={{ p: 4 }}>

                <Alert severity="error">

                    {error || "Application not found"}

                </Alert>

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

                    {application.name}

                </Typography>

            </Breadcrumbs>

            <ApplicationHeader
                application={application}
            />

            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    mb: 3,
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                }}
            >

                <Box sx={{ flex: 1 }}>

                    <GeneralInformation
                        application={application}
                        onUpdate={handleUpdate}
                    />

                </Box>

                <Box sx={{ flex: 1 }}>

                    <BusinessInformation
                        application={application}
                        onUpdate={handleUpdate}
                    />

                </Box>

            </Box>

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

                    <AssessmentSummary
                        applicationId={application.id}
                        onAssessmentSubmitted={() =>
                            setAssessmentSubmitted(prev => prev + 1)
                        }
                    />

                </Box>

                <Box sx={{ flex: 1 }}>

                    <AnalysisSection
                        applicationId={application.id}
                        refreshTrigger={assessmentSubmitted}
                    />

                </Box>

            </Box>

            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 3,
                }}
            >

                <Typography
                    variant="h6"
                    sx={{ mb: 2 }}
                >
                    Relationships
                </Typography>

                <ArtifactRelationshipTable
                    artifactId={application.id}
                />

            </Paper>

            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    p: 4,
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >

                <Box>

                    <Typography variant="h6">

                        Dependency Graph

                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >

                        Explore all applications, technologies,
                        capabilities and processes connected to this
                        application using the interactive enterprise graph.

                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    size="large"
                    onClick={() =>
                        navigate(`/graph/application/${application.id}`)
                    }
                >

                    Open Graph

                </Button>

            </Paper>

        </Box>

    );

}