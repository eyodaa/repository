import {
    Paper,
    Box,
    Typography,
    Chip,
    Divider,
} from "@mui/material";

import type { Technology } from "../../types/technology";

interface Props {
    technology: Technology;
}

export default function TechnologyHeader({
    technology,
}: Props) {

    const lifecycleColor =
        technology.lifecycleStatus === "ACTIVE"
            ? "success"
            : technology.lifecycleStatus === "RETIRED"
                ? "error"
                : "warning";

    return (

        <Paper
            sx={{
                p: 4,
                borderRadius: 3,
            }}
        >

            <Typography
                variant="h4"

            >
                {technology.name}
            </Typography>

            <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mt: 0.5 }}
            >
                {technology.code}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >

                <Chip
                    label={
                        technology.lifecycleStatus ??
                        "Unknown Status"
                    }
                    color={lifecycleColor}
                />

                <Chip
                    label={
                        technology.technologyType ??
                        "Unclassified"
                    }
                    variant="outlined"
                />

                {technology.version && (

                    <Chip
                        label={`Version ${technology.version}`}
                        variant="outlined"
                    />

                )}

                {technology.supportStatus && (

                    <Chip
                        label={technology.supportStatus}
                        color="info"
                    />

                )}

            </Box>

            <Box sx={{ mt: 3 }}>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Vendor
                </Typography>

                <Typography variant="body1">

                    {technology.vendor ?? "-"}

                </Typography>

            </Box>

        </Paper>

    );

}