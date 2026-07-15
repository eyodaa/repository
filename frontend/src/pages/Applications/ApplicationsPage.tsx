import { Box, Paper } from "@mui/material";

import ApplicationToolbar from "../../components/application/ApplicationToolbar";
import PortfolioStatistics from "../../components/application/PortfolioStatistics";
import ApplicationTable from "../../components/application/ApplicationTable";

export default function ApplicationsPage() {
    return (
        <Box sx={{ p: 3 }}>

            {/* Toolbar */}
            <ApplicationToolbar />

            {/* Statistics */}
            <Box sx={{ mt: 3 }}>
                <PortfolioStatistics />
            </Box>

            {/* Main Content */}
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

        </Box>
    );
}