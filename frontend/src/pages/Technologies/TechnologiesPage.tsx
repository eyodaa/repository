import { useState } from "react";

import {
    Box,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";

import TechnologyToolbar from "../../components/technology/TechnologyToolbar";
import TechnologyTable from "../../components/technology/TechnologyTable";
import CreateTechnologyDialog from "../../components/technology/CreateTechnologyDialog";

import { useTechnologies } from "../../hooks/useTechnologies";

export default function TechnologyPage() {

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [technologyType, setTechnologyType] =
        useState("");

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const {

        technologies,

        loading,

        error,

        refresh,

    } = useTechnologies();

    const filteredTechnologies =
        technologies.filter((technology) => {

            const matchesSearch =

                technology.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                technology.code
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =

                !status ||

                technology.lifecycleStatus === status;

            const matchesType =

                !technologyType ||

                technology.technologyType === technologyType;

            return (

                matchesSearch &&

                matchesStatus &&

                matchesType

            );

        });

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

        return (

            <Alert severity="error">

                {error}

            </Alert>

        );

    }

    return (

        <Box sx={{ p: 3 }}>

            <TechnologyToolbar

                search={search}

                status={status}

                technologyType={technologyType}

                onSearchChange={setSearch}

                onStatusChange={setStatus}

                onTechnologyTypeChange={setTechnologyType}

                onAdd={() => setDialogOpen(true)}

                onImport={() => { }}

            />



            <Box sx={{ mt: 3 }}>

                <Paper
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        height: 650,
                    }}
                >

                    <TechnologyTable
                        technologies={filteredTechnologies}
                    />

                </Paper>

            </Box>

            <CreateTechnologyDialog

                open={dialogOpen}

                onClose={() =>
                    setDialogOpen(false)
                }

                onCreated={() => {

                    refresh();

                    setDialogOpen(false);

                }}

            />

        </Box>

    );

}