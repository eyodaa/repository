import { Box, Chip } from "@mui/material";
import {
    DataGrid,
    type GridColDef,
    type GridRowParams,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import type { Technology } from "../../types/technology";

interface Props {
    technologies: Technology[];
}

const columns: GridColDef[] = [

    {
        field: "code",
        headerName: "Code",
        width: 120,
    },

    {
        field: "name",
        headerName: "Technology",
        flex: 1,
        minWidth: 240,
    },

    {
        field: "technologyType",
        headerName: "Type",
        width: 170,
    },

    {
        field: "vendor",
        headerName: "Vendor",
        width: 180,
    },

    {
        field: "version",
        headerName: "Version",
        width: 120,
    },

    {
        field: "platform",
        headerName: "Platform",
        width: 150,
    },

    {
        field: "lifecycleStatus",
        headerName: "Lifecycle",
        width: 150,

        renderCell: (params) => (

            <Chip
                label={params.value ?? "-"}
                color={
                    params.value === "ACTIVE"
                        ? "success"
                        : params.value === "RETIRED"
                            ? "error"
                            : "warning"
                }
                size="small"
            />

        ),

    },

];

export default function TechnologyTable({
    technologies,
}: Props) {

    const navigate = useNavigate();

    function handleRowClick(params: GridRowParams) {

        navigate(`/technologies/${params.row.id}`);

    }

    return (

        <Box sx={{ height: 600, width: "100%" }}>

            <DataGrid

                rows={technologies}

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