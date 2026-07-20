import { useState } from "react";
import { Box, Paper } from "@mui/material";

import ApplicationToolbar from "../../components/application/ApplicationToolbar";
import PortfolioStatistics from "../../components/application/PortfolioStatistics";
import ApplicationTable from "../../components/application/ApplicationTable";
import CreateApplicationDialog from "../../components/application/CreateApplicationDialog";

export default function ApplicationsPage() {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [criticality, setCriticality] = useState("");

    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    const handleCreated = () => {
        // easiest solution for now
        window.location.reload();
    };

    return (

        <Box sx={{ p: 3 }}>

            <ApplicationToolbar
                search={search}
                status={status}
                criticality={criticality}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onCriticalityChange={setCriticality}
                onAdd={() => setOpenCreateDialog(true)}
                onImport={() => { }}
            />

            <Box sx={{ mt: 3 }}>
                <PortfolioStatistics />
            </Box>

            <Box sx={{ mt: 2 }}>
                <Paper
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        height: 650,
                    }}
                >
                    <ApplicationTable />
                </Paper>
            </Box>

            <CreateApplicationDialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                onCreated={handleCreated}
            />

        </Box>

    );
}