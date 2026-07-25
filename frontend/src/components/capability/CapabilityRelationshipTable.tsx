import { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    Button,
    Chip,
    IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
    DataGrid,
    type GridColDef,
} from "@mui/x-data-grid";

import { relationshipService } from "../../services/relationshipService";
import { useArtifacts } from "../../hooks/useArtifacts";

import type { RelationshipResponse } from "../../types/relationship";

import CreateRelationshipDialog from "../relationship/CreateRelationshipDialog";

interface Props {
    artifactId: number;
}

export default function CapabilityRelationshipTable({
    artifactId,
}: Props) {

    const { artifacts } = useArtifacts();

    const [relationships, setRelationships] =
        useState<RelationshipResponse[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [dialogOpen, setDialogOpen] =
        useState(false);

    useEffect(() => {
        loadRelationships();
    }, [artifactId]);

    async function loadRelationships() {

        try {

            setLoading(true);

            const data =
                await relationshipService.getByArtifactId(
                    artifactId
                );

            setRelationships(data);

        } catch {

            setError("Unable to load relationships.");

        } finally {

            setLoading(false);

        }

    }

    async function deleteRelationship(id: number) {

        await relationshipService.delete(id);

        loadRelationships();

    }

    function getArtifactType(id: number) {

        return artifacts.find(a => a.id === id)?.artifactType ?? "-";

    }

    const columns: GridColDef[] = [

        {
            field: "sourceType",
            headerName: "Source Type",
            width: 150,
            valueGetter: (_, row) =>
                getArtifactType(row.sourceArtifact.id),
            renderCell: (params) =>
                <Chip label={params.value} size="small" color="success" />,
        },

        {
            field: "source",
            headerName: "Source",
            flex: 1,
            valueGetter: (_, row) =>
                `${row.sourceArtifact.code} - ${row.sourceArtifact.name}`,
        },

        {
            field: "relationshipType",
            headerName: "Relationship",
            width: 180,
            renderCell: (params) =>
                <Chip
                    label={params.value.replaceAll("_", " ")}
                    color="primary"
                    size="small"
                />,
        },

        {
            field: "targetType",
            headerName: "Target Type",
            width: 150,
            valueGetter: (_, row) =>
                getArtifactType(row.targetArtifact.id),
            renderCell: (params) =>
                <Chip label={params.value} size="small" color="secondary" />,
        },

        {
            field: "target",
            headerName: "Target",
            flex: 1,
            valueGetter: (_, row) =>
                `${row.targetArtifact.code} - ${row.targetArtifact.name}`,
        },

        {
            field: "description",
            headerName: "Description",
            flex: 1,
        },

        {
            field: "actions",
            headerName: "",
            width: 80,
            sortable: false,
            renderCell: (params) => (

                <IconButton
                    color="error"
                    onClick={() => deleteRelationship(params.row.id)}
                >
                    <DeleteIcon />
                </IconButton>

            ),
        },

    ];

    if (loading) {

        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <CircularProgress />
            </Box>
        );

    }

    if (error) {

        return <Alert severity="error">{error}</Alert>;

    }

    return (

        <Paper sx={{ p: 3, mt: 4 }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >

                <Typography variant="h6">
                    Relationships
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setDialogOpen(true)}
                >
                    Add Relationship
                </Button>

            </Box>

            <Box sx={{ height: 500 }}>

                <DataGrid
                    rows={relationships}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 5,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                />

            </Box>

            <CreateRelationshipDialog
                open={dialogOpen}
                sourceArtifactId={artifactId}
                onClose={() => setDialogOpen(false)}
                onCreated={loadRelationships}
            />

        </Paper>

    );

}