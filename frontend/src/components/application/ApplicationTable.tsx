import { Box, Chip, CircularProgress, Alert } from "@mui/material";
import {
    DataGrid,
    type GridColDef,
    type GridRowParams,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import { useApplications } from "../../hooks/useApplications";
import type { Application } from "../../types/application";

interface ApplicationTableProps { }

const columns: GridColDef[] = [
    {
        field: "code",
        headerName: "Code",
        width: 130,
    },
    {
        field: "name",
        headerName: "Application",
        flex: 1,
        minWidth: 250,
    },
    {
        field: "businessOwner",
        headerName: "Business Owner",
        width: 180,
    },
    {
        field: "vendor",
        headerName: "Vendor",
        width: 160,
    },
    {
        field: "applicationType",
        headerName: "Type",
        width: 150,
    },
    {
        field: "lifecycleStatus",
        headerName: "Lifecycle",
        width: 160,
        renderCell: (params) => (
            <Chip
                label={params.value ?? ""}
                color={
                    params.value === "Active"
                        ? "success"
                        : params.value === "Retired"
                            ? "error"
                            : "warning"
                }
                size="small"
            />
        ),
    },
];

export default function ApplicationTable() {

    const navigate = useNavigate();

    const {
        applications,
        loading,
        error,
    } = useApplications();

    const handleRowClick = (params: GridRowParams) => {
        const application = params.row as Application;
        navigate(`/applications/${application.id}`);
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 400,
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
        <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
                rows={applications}
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
                onRowClick={handleRowClick}
            />
        </Box>
    );
}