import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

import { useTechnologies } from "../../hooks/useTechnologies";

export default function TechnologyStatistics() {

    const { technologies } = useTechnologies();

    const total = technologies.length;

    const active = technologies.filter(
        t => t.lifecycleStatus === "ACTIVE"
    ).length;

    const supported = technologies.filter(
        t => t.supportStatus === "SUPPORTED"
    ).length;

    const vendors = new Set(
        technologies
            .map(t => t.vendor)
            .filter(Boolean)
    ).size;

    const statistics = [

        {
            title: "Technologies",
            value: total,
            color: "#1976d2",
        },

        {
            title: "Active",
            value: active,
            color: "#2e7d32",
        },

        {
            title: "Supported",
            value: supported,
            color: "#ed6c02",
        },

        {
            title: "Vendors",
            value: vendors,
            color: "#7b1fa2",
        },

    ];

    return (

        <Grid container spacing={3}>

            {statistics.map(item => (

                <Grid
                    key={item.title}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
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