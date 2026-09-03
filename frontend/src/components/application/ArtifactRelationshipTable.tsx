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

const inverseRelationship: Record<string, string> = {
    SUPPORTS: "SUPPORTED_BY",
    SUPPORTED_BY: "SUPPORTS",

    REALIZES: "REALIZED_BY",
    REALIZED_BY: "REALIZES",

    ENABLES: "ENABLED_BY",
    ENABLED_BY: "ENABLES",

    USES: "USED_BY",
    USED_BY: "USES",

    DEPENDS_ON: "REQUIRED_BY",
    REQUIRED_BY: "DEPENDS_ON",

    HOSTS: "HOSTED_ON",
    HOSTED_ON: "HOSTS",

    CONNECTS_TO: "CONNECTED_TO",
    CONNECTED_TO: "CONNECTS_TO",

    CONSUMES: "PROVIDED_BY",
    PROVIDED_BY: "CONSUMES",

    IMPLEMENTS: "IMPLEMENTED_BY",
    IMPLEMENTED_BY: "IMPLEMENTS",

    OWNS: "OWNED_BY",
    OWNED_BY: "OWNS",

    MANAGES: "MANAGED_BY",
    MANAGED_BY: "MANAGES",

    BELONGS_TO: "CONTAINS",
    CONTAINS: "BELONGS_TO",

    ASSOCIATED_WITH: "ASSOCIATED_WITH",
};

interface Props {
    artifactId: number;
}

export default function ArtifactRelationshipTable({
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

        setLoading(true);

        try {

            const data =
                await relationshipService.getByArtifactId(
                    artifactId
                );

            setRelationships(data);

            setError("");

        } catch {

            setError("Unable to load relationships.");

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id: number) {

        if (!window.confirm("Delete this relationship?")) {
            return;
        }

        await relationshipService.delete(id);

        loadRelationships();

    }

    function getArtifactType(id: number) {

        return (
            artifacts.find(a => a.id === id)?.artifactType ??
            "-"
        );

    }

    const columns: GridColDef[] = [

        {
            field: "sourceType",
            headerName: "Source Type",
            width: 150,
            sortable: false,
            valueGetter: (_, row) =>
                getArtifactType(row.sourceArtifact.id),
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color="success"
                    size="small"
                />
            ),
        },

        {
            field: "source",
            headerName: "Source",
            flex: 1,
            minWidth: 220,
            valueGetter: (_, row) =>
                `${row.sourceArtifact.code} - ${row.sourceArtifact.name}`,
        },

        {
            field: "relationship",
            headerName: "Relationship",
            width: 190,

            valueGetter: (_, row) => {

                const isSource =
                    row.sourceArtifact.id === artifactId;

                return isSource
                    ? row.relationshipType
                    : inverseRelationship[row.relationshipType] ??
                    row.relationshipType;

            },

            renderCell: (params) => (

                <Chip
                    label={String(params.value).replaceAll("_", " ")}
                    color="primary"
                    size="small"
                />

            ),
        },

        {
            field: "targetType",
            headerName: "Target Type",
            width: 150,
            sortable: false,
            valueGetter: (_, row) =>
                getArtifactType(row.targetArtifact.id),
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color="secondary"
                    size="small"
                />
            ),
        },

        {
            field: "target",
            headerName: "Target",
            flex: 1,
            minWidth: 220,
            valueGetter: (_, row) =>
                `${row.targetArtifact.code} - ${row.targetArtifact.name}`,
        },

        {
            field: "description",
            headerName: "Description",
            flex: 1,
            minWidth: 220,
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 90,
            sortable: false,
            filterable: false,
            renderCell: (params) => (

                <IconButton
                    color="error"
                    onClick={() =>
                        handleDelete(params.row.id)
                    }
                >
                    <DeleteIcon />
                </IconButton>

            ),
        },

    ];

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

    if (error) {

        return <Alert severity="error">{error}</Alert>;

    }

    return (

        <Paper sx={{ p: 3 }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
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