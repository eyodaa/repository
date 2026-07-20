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

interface ApplicationToolbarProps {
    search: string;
    status: string;
    criticality: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onCriticalityChange: (value: string) => void;

    onAdd: () => void;
    onImport?: () => void;
}

export default function ApplicationToolbar({
    search,
    status,
    criticality,
    onSearchChange,
    onStatusChange,
    onCriticalityChange,
    onAdd,
    onImport,
}: ApplicationToolbarProps) {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                borderRadius: 3,
                flexWrap: "wrap",
            }}
        >
            <TextField
                placeholder="Search applications..."
                size="small"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{ width: 280 }}
            />

            <FormControl
                size="small"
                sx={{ width: 170 }}
            >
                <InputLabel>Status</InputLabel>

                <Select
                    label="Status"
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="PLANNED">Planned</MenuItem>
                    <MenuItem value="RETIRED">Retired</MenuItem>
                </Select>
            </FormControl>

            <FormControl
                size="small"
                sx={{ width: 170 }}
            >
                <InputLabel>Criticality</InputLabel>

                <Select
                    label="Criticality"
                    value={criticality}
                    onChange={(e) => onCriticalityChange(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="LOW">Low</MenuItem>
                </Select>
            </FormControl>

            <Box sx={{ flexGrow: 1 }} />

            <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => onImport?.()}
            >
                Import
            </Button>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
            >
                Add Application
            </Button>
        </Paper>
    );
}