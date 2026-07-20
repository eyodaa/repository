import {
    Paper,
    TextField,
    Button,
    Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function CapabilityToolbar() {

    return (

        <Paper
            sx={{
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
            }}
        >

            <TextField
                size="small"
                placeholder="Search capability..."
                sx={{ width: 300 }}
            />

            <Box sx={{ flexGrow: 1 }} />

            <Button
                variant="contained"
                startIcon={<AddIcon />}
            >
                Add Capability
            </Button>

        </Paper>

    );

}