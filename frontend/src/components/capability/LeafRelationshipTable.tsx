import { Box, Typography, Button, Chip, Tooltip, IconButton } from "@mui/material";
import {
    DataGrid,
    type GridColDef,
} from "@mui/x-data-grid";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import type { RelationshipResponse } from "../../types/relationship";

interface Props {
    relationships: RelationshipResponse[];
    leafNodeId: number;
    leafNodeName: string;
    onAddRelationship: () => void;
    onDeleteRelationship?: (relationshipId: number) => void;
}

export default function LeafRelationshipTable({
    relationships,
    leafNodeId,
    leafNodeName,
    onAddRelationship,
    onDeleteRelationship,
}: Props) {
    const columns: GridColDef[] = [
        {
            field: "relationshipType",
            headerName: "Relationship Type",
            width: 180,
            renderCell: (params) => (
                <Chip
                    label={params.value.replace(/_/g, " ")}
                    size="small"
                    color="primary"
                />
            ),
        },
        {
            field: "targetArtifact",
            headerName: "Connected Artifact",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                const isSource = params.row.sourceArtifact.id === leafNodeId;
                const otherArtifact = isSource ? params.row.targetArtifact : params.row.sourceArtifact;
                return (
                    <Box>
                        <Box sx={{ fontWeight: 500, fontSize: "14px" }}>
                            {otherArtifact.name}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            {otherArtifact.code} ({otherArtifact.artifactType})
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "direction",
            headerName: "Direction",
            width: 100,
            renderCell: (params) => {
                const isSource = params.row.sourceArtifact.id === leafNodeId;
                return (
                    <Chip
                        label={isSource ? "→" : "←"}
                        size="small"
                        color={isSource ? "success" : "warning"}
                    />
                );
            },
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value || "-"}
                </Typography>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 80,
            renderCell: (params) => (
                <Tooltip title="Delete relationship">
                    <IconButton
                        size="small"
                        onClick={() => onDeleteRelationship?.(params.row.id)}
                        sx={{ color: "#EF4444" }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Box sx={{ fontSize: "20px", fontWeight: 600 }}>
                    Relationships for {leafNodeName}
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddRelationship}
                    size="small"
                >
                    Add Relationship
                </Button>
            </Box>

            {relationships.length === 0 ? (
                <Box
                    sx={{
                        p: 4,
                        textAlign: "center",
                        bgcolor: "rgba(148, 163, 184, 0.1)",
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No relationships found. Click "Add Relationship" to connect this artifact with other artifacts.
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ height: 300, width: "100%" }}>
                    <DataGrid
                        rows={relationships}
                        columns={columns}
                        getRowId={(row) => row.id}
                        pageSizeOptions={[5, 10]}
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    page: 0,
                                    pageSize: 5,
                                },
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}
