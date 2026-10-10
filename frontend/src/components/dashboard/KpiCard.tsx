import {
    Box,
    Card,
    CardActionArea,
    Typography,
} from "@mui/material";

import ArrowForward from "@mui/icons-material/ArrowForward";

import type { SvgIconComponent } from "@mui/icons-material";

import { Link } from "react-router-dom";

interface KpiCardProps {
    title: string;
    value: number | string;
    icon?: SvgIconComponent;
    color?: string;
    link?: string;
    linkText?: string;
}

export default function KpiCard({
    title,
    value,
    icon: Icon,
    color = "#2563EB",
    link,
    linkText = "View all",
}: KpiCardProps) {

    const cardContent = (
        <Box
            sx={{
                minHeight: 175,
                height: "100%",
                boxSizing: "border-box",

                p: 2.5,

                display: "flex",
                flexDirection: "column",
            }}
        >

            {/* Icon + Title */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >

                {/* Icon circle */}
                <Box
                    sx={{
                        width: 52,
                        height: 52,
                        minWidth: 52,

                        borderRadius: "50%",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor: color,

                        color: "#FFFFFF",

                        boxShadow:
                            `0 6px 16px ${color}45`,
                    }}
                >
                    {Icon && (
                        <Icon
                            sx={{
                                fontSize: 27,
                            }}
                        />
                    )}
                </Box>


                {/* Title */}
                <Typography
                    sx={{
                        fontSize: 15,

                        fontWeight: 600,

                        color: "#475569",

                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </Typography>

            </Box>


            {/* Number */}
            <Typography
                sx={{
                    mt: 2,

                    fontSize: 34,

                    lineHeight: 1,

                    fontWeight: 800,

                    color: "#172554",
                }}
            >
                {typeof value === "number"
                    ? value.toLocaleString()
                    : value}
            </Typography>


            {/* Bottom link */}
            {link && (
                <Box
                    sx={{
                        mt: "auto",

                        pt: 1.5,

                        display: "flex",
                        alignItems: "center",

                        gap: 0.5,

                        color,

                        fontSize: 14,

                        fontWeight: 700,
                    }}
                >
                    {linkText}

                    <ArrowForward
                        sx={{
                            fontSize: 18,
                        }}
                    />
                </Box>
            )}

        </Box>
    );


    return (
        <Card
            sx={{
                width: "100%",

                height: "100%",

                minWidth: 0,

                minHeight: 175,

                borderRadius: 3,

                backgroundColor: "#FFFFFF",

                border:
                    "1px solid #E2E8F0",

                boxShadow:
                    "0 4px 16px rgba(15, 23, 42, 0.06)",

                overflow: "hidden",

                transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",

                "&:hover": {
                    transform:
                        "translateY(-3px)",

                    boxShadow:
                        "0 10px 28px rgba(15, 23, 42, 0.10)",
                },
            }}
        >

            {link ? (

                <CardActionArea
                    component={Link}
                    to={link}
                    sx={{
                        height: "100%",
                    }}
                >
                    {cardContent}
                </CardActionArea>

            ) : (

                cardContent

            )}

        </Card>
    );
}