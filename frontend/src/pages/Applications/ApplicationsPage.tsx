import { useState } from "react";
import { Box, Paper } from "@mui/material";

import ApplicationToolbar from "../../components/application/ApplicationToolbar";
import PortfolioStatistics from "../../components/application/PortfolioStatistics";
import ApplicationTable from "../../components/application/ApplicationTable";
import CreateApplicationDialog from "../../components/application/CreateApplicationDialog";
import ApplicationImportDialog from "../../components/application/ApplicationImportDialog";

export default function ApplicationsPage() {

    const [search, setSearch] = useState("");

    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openImportDialog, setOpenImportDialog] = useState(false);

    const handleCreated = () => {
        window.location.reload();
    };

    return (
        <Box sx={{ p: 3 }}>

            <ApplicationToolbar
                search={search}
                onSearchChange={setSearch}
                onAdd={() => setOpenCreateDialog(true)}
                onImport={() => setOpenImportDialog(true)}
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
                    <ApplicationTable
                        search={search}
                    />
                </Paper>
            </Box>

            <CreateApplicationDialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                onCreated={handleCreated}
            />

            <ApplicationImportDialog
                open={openImportDialog}
                onClose={() => setOpenImportDialog(false)}
                onImported={handleCreated}
            />

        </Box>
    );
}