import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    CircularProgress,
    Paper,
} from "@mui/material";

import ProcessToolbar from "../../components/businessProcess/ProcessToolbar";
import ProcessTable from "../../components/businessProcess/ProcessTable";
import CreateProcessDialog from "../../components/businessProcess/CreateProcessDialog";

import { useProcesses } from "../../hooks/useProcesses";
import { processService } from "../../services/processService";

import type { BusinessProcess } from "../../types/process";

export default function ProcessPage() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    const {
        processes,
        loading,
        error,

    } = useProcesses();

    const filteredProcesses = processes.filter((process) => {

        const matchesSearch =
            process.name.toLowerCase().includes(search.toLowerCase()) ||
            process.code.toLowerCase().includes(search.toLowerCase()) ||
            process.processCode.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            !status ||
            process.status === status;

        const matchesCategory =
            !category ||
            process.category === category;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
        );

    });

    const handleEdit = (process: BusinessProcess) => {
        navigate(`/business-processes/${process.id}`);
    };

    const handleDelete = async (id: number) => {

        if (!window.confirm("Delete this process?")) {
            return;
        }

        try {

            await processService.delete(id);



        } catch (err) {

            console.error(err);

            alert("Unable to delete process.");

        }
    };

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                }}
            >
                <CircularProgress />
            </Box>

        );

    }

    if (error) {

        return (

            <Box sx={{ p: 3 }}>

                <Alert severity="error">

                    {String(error)}

                </Alert>

            </Box>

        );

    }

    return (

        <Box sx={{ p: 3 }}>

            <ProcessToolbar
                search={search}
                status={status}
                category={category}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onCategoryChange={setCategory}
                onAdd={() => setOpenCreateDialog(true)}
            />

            <Box sx={{ mt: 2 }}>

                <Paper
                    sx={{
                        p: 2,
                        borderRadius: 3,
                    }}
                >

                    <ProcessTable
                        processes={filteredProcesses}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </Paper>

            </Box>

            <CreateProcessDialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                onCreated={() => {



                    setOpenCreateDialog(false);

                }}
            />

        </Box>

    );

}