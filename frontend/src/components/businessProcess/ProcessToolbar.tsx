import {
    Box,
    Button,
    MenuItem,
    TextField,
    Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    search: string;
    status: string;
    category: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onCategoryChange: (value: string) => void;

    onAdd: () => void;
}

export default function ProcessToolbar({

    search,
    status,
    category,

    onSearchChange,
    onStatusChange,
    onCategoryChange,

    onAdd,

}: Props) {

    return (

        <Stack
            spacing={2}
        >

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                }}
            >

                <TextField
                    size="small"
                    label="Search Process"
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    sx={{ width: 300 }}
                />

                <TextField
                    select
                    size="small"
                    label="Status"
                    value={status}
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                    sx={{ width: 180 }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="DRAFT">Draft</MenuItem>
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                    <MenuItem value="RETIRED">Retired</MenuItem>
                </TextField>

                <TextField
                    select
                    size="small"
                    label="Category"
                    value={category}
                    onChange={(e) =>
                        onCategoryChange(e.target.value)
                    }
                    sx={{ width: 180 }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="CORE">Core</MenuItem>
                    <MenuItem value="SUPPORT">Support</MenuItem>
                    <MenuItem value="MANAGEMENT">Management</MenuItem>
                </TextField>

            </Box>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
            >
                Add Process
            </Button>

        </Stack>

    );

}