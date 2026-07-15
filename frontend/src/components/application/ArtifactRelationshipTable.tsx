import { useState, useEffect } from "react";
import {
    Box,
    CircularProgress,
    Alert,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { relationshipService } from "../../services/relationshipService";
import type { RelationshipResponse } from "../../types/relationship";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "sourceId", headerName: "Source ID", width: 130 },
    { field: "targetId", headerName: "Target ID", width: 130 },
    { field: "relationshipType", headerName: "Relationship Type", width: 200 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 300 },
];

export default function ArtifactRelationshipTable() {
    const [relationships, setRelationships] = useState<RelationshipResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadRelationships() {
            try {
                const data = await relationshipService.getAll();
                setRelationships(data);
            } catch (err) {
                setError("Failed to load relationships.");
            } finally {
                setLoading(false);
            }
        }
        loadRelationships();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
                rows={relationships}
                columns={columns}
                getRowId={(row) => row.id}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                            page: 0,
                        },
                    },
                }}
                disableRowSelectionOnClick
            />
        </Box>
    );
}
