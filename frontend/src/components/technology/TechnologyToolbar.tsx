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

interface TechnologyToolbarProps {

    search: string;

    status: string;

    technologyType: string;

    onSearchChange: (value: string) => void;

    onStatusChange: (value: string) => void;

    onTechnologyTypeChange: (value: string) => void;

    onAdd: () => void;

    onImport?: () => void;

}

export default function TechnologyToolbar({

    search,

    status,

    technologyType,

    onSearchChange,

    onStatusChange,

    onTechnologyTypeChange,

    onAdd,

    onImport,

}: TechnologyToolbarProps) {

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
                placeholder="Search technologies..."
                size="small"
                value={search}
                onChange={(e) =>
                    onSearchChange(e.target.value)
                }
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
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                >

                    <MenuItem value="">
                        All
                    </MenuItem>

                    <MenuItem value="ACTIVE">
                        Active
                    </MenuItem>

                    <MenuItem value="PLANNED">
                        Planned
                    </MenuItem>

                    <MenuItem value="RETIRED">
                        Retired
                    </MenuItem>

                </Select>

            </FormControl>

            <FormControl
                size="small"
                sx={{ width: 200 }}
            >

                <InputLabel>Technology Type</InputLabel>

                <Select
                    label="Technology Type"
                    value={technologyType}
                    onChange={(e) =>
                        onTechnologyTypeChange(e.target.value)
                    }
                >

                    <MenuItem value="">
                        All
                    </MenuItem>

                    <MenuItem value="Database">
                        Database
                    </MenuItem>

                    <MenuItem value="Framework">
                        Framework
                    </MenuItem>

                    <MenuItem value="Programming Language">
                        Programming Language
                    </MenuItem>

                    <MenuItem value="Middleware">
                        Middleware
                    </MenuItem>

                    <MenuItem value="Operating System">
                        Operating System
                    </MenuItem>

                    <MenuItem value="Cloud">
                        Cloud
                    </MenuItem>

                    <MenuItem value="Network">
                        Network
                    </MenuItem>

                    <MenuItem value="Security">
                        Security
                    </MenuItem>

                    <MenuItem value="Other">
                        Other
                    </MenuItem>

                </Select>

            </FormControl>

            <Box sx={{ flexGrow: 1 }} />

            <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={onImport}
                disabled={!onImport}
            >
                Import
            </Button>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
            >
                Add Technology
            </Button>

        </Paper>

    );

}