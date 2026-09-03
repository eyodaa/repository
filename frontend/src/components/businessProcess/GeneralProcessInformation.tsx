import {
    Paper,
    Typography,
    Stack,
} from "@mui/material";

import type { BusinessProcess } from "../../types/process";

interface Props {
    process: BusinessProcess;
}

export default function GeneralProcessInformation({
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
                General Information
            </Typography>

            <Stack spacing={1}>

                <Typography>
                    <b>Code:</b> {process.code}
                </Typography>

                <Typography>
                    <b>Process Code:</b> {process.processCode}
                </Typography>

                <Typography>
                    <b>Owner:</b> {process.processOwner}
                </Typography>

                <Typography>
                    <b>Business Unit:</b> {process.businessUnit}
                </Typography>

                <Typography>
                    <b>Version:</b> {process.version}
                </Typography>

                <Typography sx={{ mt: 2 }}>
                    <b>Description</b>
                </Typography>

                <Typography color="text.secondary">
                    {process.description}
                </Typography>

            </Stack>

        </Paper>

    );

}