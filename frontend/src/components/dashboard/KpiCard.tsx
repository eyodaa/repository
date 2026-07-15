import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

interface KpiCardProps {
    title: string;
    value: number | string;
    color?: string;
}

export default function KpiCard({
    title,
    value,
    color = "#1976d2",
}: KpiCardProps) {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                height: 130,
            }}
        >
            <CardContent>

                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {title}
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}