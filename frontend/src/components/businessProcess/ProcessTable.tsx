import {
    DataGrid,
    type GridColDef,
} from "@mui/x-data-grid";

import {
    Box,
    IconButton,
    Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

import type { BusinessProcess } from "../../types/process";

interface Props {

    processes: BusinessProcess[];

    onEdit: (process: BusinessProcess) => void;

    onDelete: (id: number) => void;

}

export default function ProcessTable({

    processes,
    onEdit,
    onDelete,

}: Props) {

    const navigate = useNavigate();

    const columns: GridColDef[] = [

        {
            field: "processCode",
            headerName: "Process Code",
            width: 150,
        },

        {
            field: "name",
            headerName: "Process Name",
            width: 250,
        },

        {
            field: "processOwner",
            headerName: "Owner",
            width: 180,
        },

        {
            field: "businessUnit",
            headerName: "Business Unit",
            width: 160,
        },

        {
            field: "status",
            headerName: "Status",
            width: 120,

            renderCell: (params) => (

                <Chip
                    label={params.value}
                    color={
                        params.value === "ACTIVE"
                            ? "success"
                            : params.value === "DRAFT"
                                ? "warning"
                                : "default"
                    }
                    size="small"
                />

            ),

        },

        {
            field: "criticality",
            headerName: "Criticality",
            width: 140,
        },

        {
            field: "automationLevel",
            headerName: "Automation",
            width: 180,
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            filterable: false,

            renderCell: (params) => (

                <Box>

                    <IconButton
                        onClick={(event) => {

                            event.stopPropagation();

                            onEdit(params.row);

                        }}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={(event) => {

                            event.stopPropagation();

                            onDelete(params.row.id);

                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                </Box>

            ),

        },

    ];

    return (

        <DataGrid

            rows={processes}

            columns={columns}

            pageSizeOptions={[10, 20, 50]}

            initialState={{
                pagination: {
                    paginationModel: {
                        page: 0,
                        pageSize: 10,
                    },
                },
            }}

            onRowClick={(params) => {

                navigate(`/processes/${params.row.id}`);

            }}

            autoHeight

            disableRowSelectionOnClick

        />

    );

}