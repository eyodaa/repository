import {
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";

export default function ApplicationToolbar() {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                borderRadius: 3,
            }}
        >
            <TextField
                placeholder="Search applications..."
                size="small"
                sx={{ width: 280 }}
            />

            <FormControl size="small" sx={{ width: 170 }}>
                <InputLabel>Status</InputLabel>

                <Select
                    label="Status"
                    defaultValue=""
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Retire">Retire</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ width: 170 }}>
                <InputLabel>Criticality</InputLabel>

                <Select
                    label="Criticality"
                    defaultValue=""
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </Select>
            </FormControl>

            <Box sx={{ flexGrow: 1 }} />

            <Button
                variant="outlined"
                startIcon={<UploadIcon />}
            >
                Import
            </Button>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
            >
                Add Application
            </Button>
        </Paper>
    );
}