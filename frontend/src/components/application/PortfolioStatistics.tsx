import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

const statistics = [
    {
        title: "Applications",
        value: 142,
        color: "#1976d2",
    },
    {
        title: "Active",
        value: 118,
        color: "#2e7d32",
    },
    {
        title: "Average Health",
        value: "4.2",
        color: "#ed6c02",
    },
    {
        title: "Annual TCO",
        value: "$4.3M",
        color: "#7b1fa2",
    },
];

export default function PortfolioStatistics() {
    return (
        <Grid container spacing={3}>
            {statistics.map((item) => (
                <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            height: 130,
                        }}
                    >
                        <CardContent>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {item.title}
                            </Typography>

                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: item.color,
                                        fontWeight: 700,
                                    }}
                                >
                                    {item.value}
                                </Typography>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}