import { Box, Chip, CircularProgress, Alert } from "@mui/material";
import {
    DataGrid,
    type GridColDef,
    type GridRowParams,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import { useCapabilities } from "../../hooks/useCapabilities";

const columns: GridColDef[] = [

    {
        field: "code",
        headerName: "Code",
        width: 130,
    },

    {
        field: "name",
        headerName: "Capability",
        flex: 1,
        minWidth: 260,
    },

    {
        field: "parentCode",
        headerName: "Parent",
        width: 150,
        renderCell: (params) => {
            const parentCode =
                params.row.parentCode ?? "-";
            return (
                <Chip
                    label={parentCode}
                    color="default"
                    size="small"
                />
            );
        },
    },

    {
        field: "maturityLevel",
        headerName: "Current",
        width: 120,
        renderCell: (params) => (
            <Chip
                label={params.value ?? "-"}
                color="primary"
                size="small"
            />
        ),
    },

    {
        field: "targetMaturity",
        headerName: "Target",
        width: 120,
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
        capabilities,
        loading,
        error,
    } = useCapabilities();

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

        return <Alert severity="error">{error}</Alert>;

    }

    return (

        <Box sx={{ height: 600, width: "100%" }}>

            <DataGrid

                rows={capabilities}

                columns={columns}

                getRowId={(row) => row.id}

                pageSizeOptions={[5, 10, 20]}

                disableRowSelectionOnClick

                onRowClick={handleRowClick}

                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 10,
                        },
                    },
                }}

            />

        </Box>

    );

}