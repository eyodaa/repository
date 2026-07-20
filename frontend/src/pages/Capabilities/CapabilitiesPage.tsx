import { Box, Typography } from "@mui/material";

import PortfolioCapabilityStatistics from "../../components/capability/PortfolioCapabilityStatistics";
import CapabilityTable from "../../components/capability/CapabilityTable";

export default function CapabilityPage() {

    return (

        <Box sx={{ p: 4 }}>

            <Typography
                variant="h4"

                sx={{ mb: 3 }}
            >
                Business Capabilities
            </Typography>

            <PortfolioCapabilityStatistics />

            <Box sx={{ mt: 4 }}>

                <CapabilityTable />

            </Box>

        </Box>

    );

}