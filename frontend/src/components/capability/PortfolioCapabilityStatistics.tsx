import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

import { useCapabilities } from "../../hooks/useCapabilities";

export default function PortfolioCapabilityStatistics() {

    const { capabilities } = useCapabilities();

    const totalCapabilities = capabilities.length;


    const averageTarget = capabilities.length === 0
        ? 0
        : (
            capabilities.reduce(
                (sum, capability) => sum + (capability.targetMaturity ?? 0),
                0
            ) / capabilities.length
        ).toFixed(1);

    const totalParents = new Set(
        capabilities
            .map(c => c.parentId || c.parentId)
            .filter(id => id != null)
    ).size;

    const totalAverage = capabilities.length === 0
        ? 0
        : (
            capabilities.reduce(
                (sum, capability) => sum + (((capability.maturityLevel ?? capability.maturityLevel ?? 0) + (capability.targetMaturity ?? 0)) / 2),
                0
            ) / capabilities.length
        ).toFixed(1);

    const statistics = [

        {
            title: "Capabilities",
            value: totalCapabilities,
            color: "#1976d2",
        },

        {
            title: "Root Capability",
            value: totalParents,
            color: "#6e355aff",
        },

        {
            title: "Average Target",
            value: averageTarget,
            color: "#7b1fa2",
        },

        {
            title: "Total Average",
            value: totalAverage,
            color: "#0288d1",
        },

    ];

    return (

        <Grid container spacing={3}>

            {statistics.map((item) => (

                <Grid
                    key={item.title}
                    size={{ xs: 12, sm: 6, md: 3 }}
                >

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