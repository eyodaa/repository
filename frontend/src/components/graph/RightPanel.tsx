import { Paper, Typography } from "@mui/material";

export default function RightPanel() {
    return (
        <Paper
            elevation={2}
            sx={{
                height: "100%",
                p: 2,
                borderRadius: 3
            }}
        >
            <Typography variant="h6" gutterBottom>
                Analytics
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Selected node information and repository statistics will appear here.
            </Typography>
        </Paper>
    );
}