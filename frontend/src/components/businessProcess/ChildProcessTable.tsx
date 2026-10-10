import {
    Chip,
    Paper,
    Typography,
    Stack,
} from "@mui/material";

import type { ChildProcess } from "../../types/process";

interface Props {
    children: ChildProcess[];
}

export default function ChildProcessTable({
    children,
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
                Child Processes
            </Typography>

            {children.length === 0 ? (

                <Typography color="text.secondary">
                    No child processes available.
                </Typography>

            ) : (

                <Stack
                    direction="row"


                >

                    {children.map((child) => (

                        <Chip
                            key={child.id}
                            label={`${child.code} - ${child.name}`}
                        />

                    ))}

                </Stack>

            )}

        </Paper>

    );

}