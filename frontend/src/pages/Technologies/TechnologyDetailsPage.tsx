import { useEffect, useState } from "react";

import {
    Box,
    Breadcrumbs,
    Link,
    Typography,
    CircularProgress,
    Alert,
    Button,
} from "@mui/material";

import { useParams } from "react-router-dom";

import { technologyService } from "../../services/technologyService";

import type { Technology } from "../../types/technology";

import TechnologyHeader from "../../components/technology/TechnologyHeader";
import GeneralTechnologyInformation from "../../components/technology/GeneralTechnologyInformation";
import LifecycleInformation from "../../components/technology/LifecycleInformation";
import TechnologyRelationshipTable from "../../components/technology/TechnologyRelationshipTable";
import EditTechnologyDialog from "../../components/technology/EditTechnologyDialog";

export default function TechnologyDetailsPage() {

    const { id } = useParams();

    const [technology, setTechnology] =
        useState<Technology | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [editOpen, setEditOpen] =
        useState(false);

    useEffect(() => {

        if (!id) return;

        loadTechnology();

    }, [id]);

    async function loadTechnology() {

        setLoading(true);

        try {

            const response =
                await technologyService.getById(Number(id));

            setTechnology(response.data);

            setError("");

        }

        catch {

            setError("Unable to load technology.");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 5,
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    if (error || !technology) {

        return (

            <Alert severity="error">

                {error}

            </Alert>

        );

    }

    return (

        <Box sx={{ p: 4 }}>

            <Breadcrumbs sx={{ mb: 3 }}>

                <Link
                    underline="hover"
                    href="/technologies"
                >
                    Technologies
                </Link>

                <Typography>

                    {technology.name}

                </Typography>

            </Breadcrumbs>

            <TechnologyHeader technology={technology} />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                }}
            >

                <Button
                    variant="contained"
                    onClick={() =>
                        setEditOpen(true)
                    }
                >

                    Edit Technology

                </Button>

            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    my: 3,
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                }}
            >

                <Box sx={{ flex: 1 }}>

                    <GeneralTechnologyInformation
                        technology={technology}
                    />

                </Box>

                <Box sx={{ flex: 1 }}>

                    <LifecycleInformation
                        technology={technology}
                    />

                </Box>

            </Box>

            <TechnologyRelationshipTable
                artifactId={technology.id}
            />

            <EditTechnologyDialog

                open={editOpen}

                technology={technology}

                onClose={() =>
                    setEditOpen(false)
                }

                onUpdated={loadTechnology}

            />

        </Box>

    );

}