import {
    Box,
    Chip,
    CircularProgress,
    Alert,
    IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import {
    DataGrid,
    type GridColDef,
    type GridRowParams,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useApplications } from "../../hooks/useApplications";
import { tcoService } from "../../services/tcoService";

import type { Application } from "../../types/application";

interface ApplicationTableProps {
    search: string;
    onDelete?: (id: number) => void;
}

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

        renderCell: (params) => {

            const value = params.value;

            if (!value) {
                return (
                    <Chip
                        label="N/A"
                        size="small"
                    />
                );
            }

            return (
                <Chip
                    label={value}
                    color={
                        value === "ACTIVE"
                            ? "success"
                            : value === "RETIRED"
                                ? "error"
                                : value === "PLANNED"
                                    ? "warning"
                                    : "default"
                    }
                    size="small"
                />
            );
        },
    },

    {
        field: "tcoScore",
        headerName: "TCO Score",
        width: 120,

        renderCell: (params) => {

            const score =
                params.row.tcoScore;

            if (
                score === undefined ||
                score === null
            ) {
                return (
                    <Chip
                        label="N/A"
                        size="small"
                    />
                );
            }

            return (
                <Chip
                    label={score.toFixed(1)}
                    size="small"
                    color={
                        score >= 4
                            ? "success"
                            : score >= 3
                                ? "warning"
                                : "error"
                    }
                />
            );
        },
    },

    {
        field: "totalCost",
        headerName: "Total Cost",
        width: 140,

        renderCell: (params) => {

            const cost =
                params.row.totalCost;

            if (
                cost === undefined ||
                cost === null
            ) {
                return (
                    <span
                        style={{
                            color: "#94A3B8",
                        }}
                    >
                        N/A
                    </span>
                );
            }

            return (
                <span
                    style={{
                        fontWeight: 500,
                    }}
                >
                    {cost.toLocaleString()} USD
                </span>
            );
        },
    },
];

export default function ApplicationTable({
    search,
    onDelete,
}: ApplicationTableProps) {

    const navigate = useNavigate();

    const {
        applications,
        loading,
        error,
    } = useApplications();

    const [
        applicationsWithTCO,
        setApplicationsWithTCO,
    ] = useState<any[]>([]);

    useEffect(() => {
        loadTCOData();
    }, [applications]);

    async function loadTCOData() {

        const appsWithTCO =
            await Promise.all(

                applications.map(
                    async (app) => {

                        try {

                            const response =
                                await tcoService
                                    .getApplicationAssessments(
                                        app.id
                                    );

                            const assessments =
                                response.data;

                            const latestAssessment =
                                assessments.length > 0
                                    ? assessments[0]
                                    : null;

                            return {
                                ...app,
                                tcoScore:
                                    latestAssessment
                                        ?.overallScore,
                                totalCost:
                                    latestAssessment
                                        ?.totalCost,
                            };

                        } catch {

                            return {
                                ...app,
                                tcoScore:
                                    undefined,
                                totalCost:
                                    undefined,
                            };
                        }
                    }
                )
            );

        setApplicationsWithTCO(
            appsWithTCO
        );
    }

    /*
     * Search only.
     *
     * No status filtering.
     * No priority filtering.
     */
    const filteredApplications =
        applicationsWithTCO.filter(
            (app) => {

                const searchValue =
                    search
                        .trim()
                        .toLowerCase();

                if (!searchValue) {
                    return true;
                }

                return (
                    app.name
                        ?.toLowerCase()
                        .includes(searchValue) ||

                    app.code
                        ?.toLowerCase()
                        .includes(searchValue) ||

                    app.businessOwner
                        ?.toLowerCase()
                        .includes(searchValue) ||

                    app.vendor
                        ?.toLowerCase()
                        .includes(searchValue)
                );
            }
        );

    const handleRowClick = (
        params: GridRowParams
    ) => {

        const application =
            params.row as Application;

        navigate(
            `/applications/${application.id}`
        );
    };

    const tableColumns = [...columns];
    
    if (onDelete) {
        tableColumns.push({
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box>
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
        });
    }

    if (loading) {

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
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
        <Box
            sx={{
                height: 600,
                width: "100%",
            }}
        >

            <DataGrid
                rows={
                    filteredApplications
                }
                columns={tableColumns}

                getRowId={(row) =>
                    row.id
                }

                pageSizeOptions={[
                    5,
                    10,
                    20,
                ]}

                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                            page: 0,
                        },
                    },
                }}

                disableRowSelectionOnClick

                onRowClick={
                    handleRowClick
                }
            />

        </Box>
    );
}