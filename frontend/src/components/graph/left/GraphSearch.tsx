import { Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function GraphSearch() {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                bgcolor: "transparent"
            }}
        >
            <TextField
                fullWidth
                size="small"
                placeholder="Search artifacts..."
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Paper>
    );
}