import {
    Box,
    Button,
    Chip,
    Typography,
} from "@mui/material";

import type { BusinessProcess } from "../../types/process";

interface Props {
    process: BusinessProcess;
    onEdit: () => void;
}

export default function ProcessHeader({
    process,
    onEdit,
}: Props) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
            }}
        >

            <Box>

                <Typography
                    variant="h4"

                >
                    {process.name}
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >
                    {process.processCode}
                </Typography>

                <Chip
                    label={process.status}
                    color={
                        process.status === "ACTIVE"
                            ? "success"
                            : process.status === "DRAFT"
                                ? "warning"
                                : "default"
                    }
                />

            </Box>

            <Button
                variant="contained"
                onClick={onEdit}
            >
                Edit Process
            </Button>

        </Box>

    );

}