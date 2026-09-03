import {
    Paper,
    TextField,
    Button,
    Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";

interface ApplicationToolbarProps {
    search: string;

    onSearchChange: (value: string) => void;

    onAdd: () => void;
    onImport?: () => void;
}

export default function ApplicationToolbar({
    search,
    onSearchChange,
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
                onChange={(e) =>
                    onSearchChange(e.target.value)
                }
                sx={{ width: 280 }}
            />

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