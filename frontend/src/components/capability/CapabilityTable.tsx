import { Box, Chip, CircularProgress, Alert } from "@mui/material";
import {
    DataGrid,
    type GridColDef,
    type GridRowParams,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import { useCapabilityNodes } from "../../hooks/useCapabilityNodes";

const columns: GridColDef[] = [

    {
        field: "code",
        headerName: "Code",
        width: 140,
    },

    {
        field: "name",
        headerName: "Capability",
        flex: 1,
        minWidth: 300,
    },

    {
        field: "level",
        headerName: "Level",
        width: 120,
        renderCell: (params) => (
            <Chip
                label={`L${params.value}`}
                color="primary"
                size="small"
            />
        ),
    },

    {
        field: "currentMaturity",
        headerName: "Current",
        width: 130,
        renderCell: (params) => (
            <Chip
                label={params.value ?? "-"}
                color="warning"
                size="small"
            />
        ),
    },

    {
        field: "targetMaturity",
        headerName: "Target",
        width: 130,
        renderCell: (params) => (
            <Chip
                label={params.value ?? "-"}
                color="success"
                size="small"
            />
        ),
    },

];

export default function CapabilityTable() {

    const navigate = useNavigate();

    const {
        nodes,
        loading,
        error,
    } = useCapabilityNodes();

    function handleRowClick(params: GridRowParams) {

        navigate(`/capabilities/${params.row.id}`);

    }

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

        return (
            <Alert severity="error">
                {error}
            </Alert>
        );

    }

    return (

        <Box sx={{ height: 600, width: "100%" }}>

            <DataGrid

                rows={nodes}

                columns={columns}

                getRowId={(row) => row.id}

                pageSizeOptions={[5, 10, 20]}

                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 10,
                        },
                    },
                }}

                disableRowSelectionOnClick

                onRowClick={handleRowClick}

            />

        </Box>

    );

}