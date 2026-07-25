import { Box, Stack, Typography } from "@mui/material";

const items = [
    { color: "#42a5f5", label: "Application" },
    { color: "#66bb6a", label: "Technology" },
    { color: "#ab47bc", label: "Capability" },
    { color: "#ffb74d", label: "Process" },
];

export default function GraphLegend() {
    return (
        <Box>

            <Typography
                variant="subtitle2"
                sx={{ mb: 1 }}
            >
                Legend
            </Typography>

            {items.map((item) => (

                <Stack
                    direction="row"
                    spacing={1}
                    key={item.label}
                    sx={{ mb: 1 }}
                >

                    <Box
                        sx={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            bgcolor: item.color,
                        }}
                    />

                    <Typography variant="body2">
                        {item.label}
                    </Typography>

                </Stack>

            ))}

        </Box>
    );
}