import {
    Box,
    Chip,
    Paper,
    Typography,
} from "@mui/material";

import type { BusinessProcess } from "../../types/process";

interface Props {
    process: BusinessProcess;
}

export default function ProcessClassification({
    process,
}: Props) {

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >

            <Typography
                variant="h6"
                gutterBottom
            >
                Classification
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 3,
                }}
            >

                <Chip label={process.category} />

                <Chip label={process.criticality} />

                <Chip label={process.automationLevel} />

                <Chip label={process.processLevel} />

            </Box>

            <Typography>
                <b>Parent Process:</b>{" "}
                {process.parentProcessName ?? "None"}
            </Typography>

            <Typography sx={{ mt: 2 }}>
                <b>Documentation</b>
            </Typography>

            <Typography color="text.secondary">
                {process.documentation || "-"}
            </Typography>

        </Paper>

    );

}