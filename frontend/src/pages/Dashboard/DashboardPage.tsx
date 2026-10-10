import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Typography,
} from "@mui/material";

import AppsIcon from "@mui/icons-material/Apps";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import HubIcon from "@mui/icons-material/Hub";
import LanIcon from "@mui/icons-material/Lan";
import MemoryIcon from "@mui/icons-material/Memory";
import RefreshIcon from "@mui/icons-material/Refresh";

import { applicationService } from "../../services/applicationService";
import { technologyService } from "../../services/technologyService";
import { capabilityService } from "../../services/capabilityService";
import { processService } from "../../services/processService";
import { relationshipService } from "../../services/relationshipService";


interface DashboardCounts {
    applications: number;
    technologies: number;
    capabilities: number;
    processes: number;
    relationships: number;
}


interface KpiCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    link: string;
}


/* =========================================================
   KPI CARD
========================================================= */

function KpiCard({
    title,
    value,
    icon,
    color,
    link,
}: KpiCardProps) {

    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                height: "100%",
                minHeight: 185,

                p: 2.5,

                boxSizing: "border-box",

                borderRadius: 4,

                backgroundColor: "#FFFFFF",

                border: "1px solid #E2E8F0",

                boxShadow:
                    "0 6px 20px rgba(15, 23, 42, 0.06)",

                transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",

                "&:hover": {
                    transform: "translateY(-3px)",

                    boxShadow:
                        "0 12px 28px rgba(15, 23, 42, 0.10)",
                },
            }}
        >

            {/* Top section */}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",

                    mb: 2,
                }}
            >

                {/* Icon */}

                <Box
                    sx={{
                        width: 52,
                        height: 52,

                        borderRadius: "50%",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor: `${color}18`,

                        color: color,
                    }}
                >
                    {icon}
                </Box>


                {/* Repository label */}

                <Typography
                    sx={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#94A3B8",
                    }}
                >
                    Repository
                </Typography>

            </Box>


            {/* Title */}

            <Typography
                sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#475569",

                    mb: 0.5,
                }}
            >
                {title}
            </Typography>


            {/* Value */}

            <Typography
                sx={{
                    fontSize: 36,
                    lineHeight: 1.1,

                    fontWeight: 800,

                    color: "#172B5B",

                    mb: 2,
                }}
            >
                {value.toLocaleString()}
            </Typography>


            {/* Link */}

            <Button
                href={link}
                endIcon={
                    <ArrowForwardIcon
                        sx={{
                            fontSize: 17,
                        }}
                    />
                }
                sx={{
                    p: 0,

                    minWidth: 0,

                    textTransform: "none",

                    fontWeight: 700,

                    color: color,

                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                }}
            >
                View all
            </Button>

        </Paper>
    );
}


/* =========================================================
   DASHBOARD
========================================================= */

export default function DashboardPage() {

    const [counts, setCounts] =
        useState<DashboardCounts>({
            applications: 0,
            technologies: 0,
            capabilities: 0,
            processes: 0,
            relationships: 0,
        });


    const [loading, setLoading] =
        useState<boolean>(true);


    const [error, setError] =
        useState<string | null>(null);


    /* =====================================================
       LOAD REAL DATA FROM BACKEND
    ===================================================== */

    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError(null);


            const [
                applications,
                technologies,
                capabilities,
                processes,
                relationships,
            ] = await Promise.all([

                applicationService.getAll(),

                technologyService.getAll(),

                capabilityService.getAll(),

                processService.getAll(),

                relationshipService.getAll(),

            ]);


            setCounts({

                applications:
                    Array.isArray(applications)
                        ? applications.length
                        : 0,

                technologies:
                    Array.isArray(technologies)
                        ? technologies.length
                        : 0,

                capabilities:
                    Array.isArray(capabilities)
                        ? capabilities.length
                        : 0,

                processes:
                    Array.isArray(processes)
                        ? processes.length
                        : 0,

                relationships:
                    Array.isArray(relationships)
                        ? relationships.length
                        : 0,

            });

        } catch (err) {

            console.error(
                "Failed to load dashboard:",
                err
            );

            setError(
                "Unable to load repository statistics."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadDashboard();

    }, []);


    /* =====================================================
       TOTAL ARTIFACTS
    ===================================================== */

    const totalArtifacts = useMemo(() => {

        return (
            counts.applications +
            counts.technologies +
            counts.capabilities +
            counts.processes
        );

    }, [counts]);


    /* =====================================================
       COMPOSITION PERCENTAGES
    ===================================================== */

    const composition = useMemo(() => {

        if (totalArtifacts === 0) {

            return {
                applications: 0,
                technologies: 0,
                capabilities: 0,
                processes: 0,
            };

        }


        return {

            applications:
                (counts.applications /
                    totalArtifacts) *
                100,

            technologies:
                (counts.technologies /
                    totalArtifacts) *
                100,

            capabilities:
                (counts.capabilities /
                    totalArtifacts) *
                100,

            processes:
                (counts.processes /
                    totalArtifacts) *
                100,

        };

    }, [counts, totalArtifacts]);


    /* =====================================================
       PAGE
    ===================================================== */

    return (

        <Box
            sx={{
                width: "100%",
                maxWidth: 1600,

                mx: "auto",

                pb: 5,
            }}
        >

            {/* =================================================
                WELCOME
            ================================================= */}

            <Paper
                elevation={0}
                sx={{
                    mb: 3,

                    px: {
                        xs: 2.5,
                        md: 4,
                    },

                    py: {
                        xs: 2.5,
                        md: 3.5,
                    },

                    borderRadius: 4,

                    background:
                        "linear-gradient(135deg, #EEF5FF 0%, #F8FBFF 55%, #E7F3FF 100%)",

                    border:
                        "1px solid #D8E7FA",

                    position: "relative",

                    overflow: "hidden",
                }}
            >

                {/* Decorative circle */}

                <Box
                    sx={{
                        position: "absolute",

                        width: 240,
                        height: 240,

                        borderRadius: "50%",

                        background:
                            "rgba(37, 99, 235, 0.05)",

                        right: -80,
                        top: -120,
                    }}
                />


                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: {
                                xs: 25,
                                md: 30,
                            },

                            fontWeight: 800,

                            color: "#172B5B",

                            mb: 0.75,
                        }}
                    >
                        Welcome👋
                    </Typography>


                    <Typography
                        sx={{
                            fontSize: 15,

                            color: "#64748B",

                            maxWidth: 650,
                        }}
                    >
                        Here's what's happening in your
                        enterprise architecture repository
                        today.
                    </Typography>

                </Box>

            </Paper>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                        borderRadius: 3,
                    }}
                    action={

                        <Button
                            color="inherit"
                            size="small"

                            startIcon={
                                <RefreshIcon />
                            }

                            onClick={
                                loadDashboard
                            }
                        >
                            Retry
                        </Button>

                    }
                >
                    {error}
                </Alert>

            )}


            {/* =================================================
                LOADING
            ================================================= */}

            {loading ? (

                <Box
                    sx={{
                        minHeight: 300,

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",
                    }}
                >

                    <CircularProgress />

                </Box>

            ) : (

                <>

                    {/* =========================================
                        KPI CARDS

                        3 COLUMNS × 2 ROWS
                    ========================================= */}

                    <Grid
                        container
                        spacing={2.5}
                        sx={{
                            width: "100%",
                            mb: 3,
                        }}
                    >

                        {/* Applications */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 4,
                            }}
                        >

                            <KpiCard
                                title="Applications"

                                value={
                                    counts.applications
                                }

                                icon={
                                    <AppsIcon
                                        sx={{
                                            fontSize: 27,
                                        }}
                                    />
                                }

                                color="#2563EB"

                                link="/applications"
                            />

                        </Grid>


                        {/* Technologies */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 4,
                            }}
                        >

                            <KpiCard
                                title="Technologies"

                                value={
                                    counts.technologies
                                }

                                icon={
                                    <MemoryIcon
                                        sx={{
                                            fontSize: 27,
                                        }}
                                    />
                                }

                                color="#16A34A"

                                link="/technologies"
                            />

                        </Grid>


                        {/* Capabilities */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 4,
                            }}
                        >

                            <KpiCard
                                title="Capabilities"

                                value={
                                    counts.capabilities
                                }

                                icon={
                                    <BusinessCenterIcon
                                        sx={{
                                            fontSize: 27,
                                        }}
                                    />
                                }

                                color="#9333EA"

                                link="/capabilities"
                            />

                        </Grid>


                        {/* Processes */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 4,
                            }}
                        >

                            <KpiCard
                                title="Processes"

                                value={
                                    counts.processes
                                }

                                icon={
                                    <LanIcon
                                        sx={{
                                            fontSize: 27,
                                        }}
                                    />
                                }

                                color="#EA580C"

                                link="/processes"
                            />

                        </Grid>


                        {/* Relationships */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 4,
                            }}
                        >

                            <KpiCard
                                title="Relationships"

                                value={
                                    counts.relationships
                                }

                                icon={
                                    <HubIcon
                                        sx={{
                                            fontSize: 27,
                                        }}
                                    />
                                }

                                color="#0891B2"

                                link="/relationships"
                            />

                        </Grid>


                        {/* Total Artifacts */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 4,
                            }}
                        >

                            <KpiCard
                                title="Total Artifacts"

                                value={
                                    totalArtifacts
                                }

                                icon={
                                    <DeviceHubIcon
                                        sx={{
                                            fontSize: 27,
                                        }}
                                    />
                                }

                                color="#CA8A04"

                                link="/"
                            />

                        </Grid>

                    </Grid>


                    {/* =================================================
                        LOWER DASHBOARD
                    ================================================= */}

                    <Grid
                        container
                        spacing={2.5}
                    >

                        {/* =============================================
                            REPOSITORY COMPOSITION
                        ============================================= */}

                        <Grid
                            size={{
                                xs: 12,
                                lg: 7,
                            }}
                        >

                            <Paper
                                elevation={0}
                                sx={{
                                    height: "100%",

                                    p: 3,

                                    borderRadius: 4,

                                    backgroundColor:
                                        "#FFFFFF",

                                    border:
                                        "1px solid #E2E8F0",

                                    boxShadow:
                                        "0 6px 20px rgba(15, 23, 42, 0.05)",
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontSize: 21,

                                        fontWeight: 800,

                                        color:
                                            "#172B5B",

                                        mb: 0.5,
                                    }}
                                >
                                    Repository Composition
                                </Typography>


                                <Typography
                                    sx={{
                                        fontSize: 14,

                                        color:
                                            "#64748B",

                                        mb: 3,
                                    }}
                                >
                                    Distribution of your
                                    architecture artifacts
                                </Typography>


                                {/* Applications */}

                                <CompositionRow
                                    label="Applications"
                                    value={
                                        counts.applications
                                    }
                                    percentage={
                                        composition.applications
                                    }
                                    color="#2563EB"
                                />


                                {/* Technologies */}

                                <CompositionRow
                                    label="Technologies"
                                    value={
                                        counts.technologies
                                    }
                                    percentage={
                                        composition.technologies
                                    }
                                    color="#16A34A"
                                />


                                {/* Capabilities */}

                                <CompositionRow
                                    label="Capabilities"
                                    value={
                                        counts.capabilities
                                    }
                                    percentage={
                                        composition.capabilities
                                    }
                                    color="#9333EA"
                                />


                                {/* Processes */}

                                <CompositionRow
                                    label="Processes"
                                    value={
                                        counts.processes
                                    }
                                    percentage={
                                        composition.processes
                                    }
                                    color="#EA580C"
                                />


                                <Divider
                                    sx={{
                                        my: 3,
                                    }}
                                />


                                <Box
                                    sx={{
                                        display: "flex",

                                        alignItems:
                                            "center",

                                        justifyContent:
                                            "space-between",
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            sx={{
                                                fontSize: 13,

                                                color:
                                                    "#64748B",
                                            }}
                                        >
                                            Total artifacts
                                        </Typography>


                                        <Typography
                                            sx={{
                                                fontSize: 28,

                                                fontWeight: 800,

                                                color:
                                                    "#172B5B",
                                            }}
                                        >
                                            {totalArtifacts.toLocaleString()}
                                        </Typography>

                                    </Box>


                                    <DeviceHubIcon
                                        sx={{
                                            fontSize: 44,

                                            color:
                                                "#2563EB",

                                            opacity: 0.7,
                                        }}
                                    />

                                </Box>

                            </Paper>

                        </Grid>


                        {/* =============================================
                            QUICK ACTIONS
                        ============================================= */}

                        <Grid
                            size={{
                                xs: 12,
                                lg: 5,
                            }}
                        >

                            <Paper
                                elevation={0}
                                sx={{
                                    height: "100%",

                                    p: 3,

                                    borderRadius: 4,

                                    backgroundColor:
                                        "#FFFFFF",

                                    border:
                                        "1px solid #E2E8F0",

                                    boxShadow:
                                        "0 6px 20px rgba(15, 23, 42, 0.05)",
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontSize: 21,

                                        fontWeight: 800,

                                        color:
                                            "#172B5B",

                                        mb: 0.5,
                                    }}
                                >
                                    Quick Actions
                                </Typography>


                                <Typography
                                    sx={{
                                        fontSize: 14,

                                        color:
                                            "#64748B",

                                        mb: 2.5,
                                    }}
                                >
                                    Access the main repository
                                    areas
                                </Typography>


                                <QuickAction
                                    label="Manage Applications"
                                    href="/applications"
                                    icon={
                                        <AppsIcon />
                                    }
                                    color="#2563EB"
                                />


                                <QuickAction
                                    label="Manage Technologies"
                                    href="/technologies"
                                    icon={
                                        <MemoryIcon />
                                    }
                                    color="#16A34A"
                                />


                                <QuickAction
                                    label="Manage Capabilities"
                                    href="/capabilities"
                                    icon={
                                        <BusinessCenterIcon />
                                    }
                                    color="#9333EA"
                                />


                                <QuickAction
                                    label="Manage Processes"
                                    href="/processes"
                                    icon={
                                        <LanIcon />
                                    }
                                    color="#EA580C"
                                />


                                <QuickAction
                                    label="Explore Relationships"
                                    href="/relationships"
                                    icon={
                                        <HubIcon />
                                    }
                                    color="#0891B2"
                                />

                            </Paper>

                        </Grid>

                    </Grid>

                </>

            )}

        </Box>
    );
}


/* =========================================================
   COMPOSITION ROW
========================================================= */

interface CompositionRowProps {
    label: string;
    value: number;
    percentage: number;
    color: string;
}


function CompositionRow({
    label,
    value,
    percentage,
    color,
}: CompositionRowProps) {

    return (

        <Box
            sx={{
                mb: 2.5,
            }}
        >

            <Box
                sx={{
                    display: "flex",

                    alignItems: "center",

                    justifyContent:
                        "space-between",

                    mb: 0.8,
                }}
            >

                <Typography
                    sx={{
                        fontSize: 14,

                        fontWeight: 600,

                        color: "#334155",
                    }}
                >
                    {label}
                </Typography>


                <Typography
                    sx={{
                        fontSize: 14,

                        fontWeight: 700,

                        color: color,
                    }}
                >
                    {value.toLocaleString()}
                </Typography>

            </Box>


            <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                    height: 8,

                    borderRadius: 10,

                    backgroundColor:
                        "#EEF2F7",

                    "& .MuiLinearProgress-bar": {
                        borderRadius: 10,

                        backgroundColor:
                            color,
                    },
                }}
            />


            <Typography
                sx={{
                    fontSize: 11,

                    color: "#94A3B8",

                    mt: 0.5,
                }}
            >
                {percentage.toFixed(1)}%
            </Typography>

        </Box>
    );
}


/* =========================================================
   QUICK ACTION
========================================================= */

interface QuickActionProps {
    label: string;
    href: string;
    icon: React.ReactNode;
    color: string;
}


function QuickAction({
    label,
    href,
    icon,
    color,
}: QuickActionProps) {

    return (

        <Button
            href={href}

            fullWidth

            variant="outlined"

            sx={{
                display: "flex",

                alignItems: "center",

                justifyContent:
                    "flex-start",

                textTransform: "none",

                borderRadius: 2.5,

                py: 1.4,

                px: 1.8,

                mb: 1.2,

                color: "#334155",

                borderColor: "#E2E8F0",

                "&:hover": {
                    borderColor: color,

                    backgroundColor:
                        `${color}08`,
                },
            }}
        >

            <Box
                sx={{
                    width: 36,
                    height: 36,

                    borderRadius: 2,

                    display: "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",

                    mr: 1.5,

                    color: color,

                    backgroundColor:
                        `${color}12`,
                }}
            >
                {icon}
            </Box>


            <Typography
                sx={{
                    flexGrow: 1,

                    textAlign: "left",

                    fontSize: 14,

                    fontWeight: 600,
                }}
            >
                {label}
            </Typography>


            <ArrowForwardIcon
                sx={{
                    fontSize: 18,

                    color: "#94A3B8",
                }}
            />

        </Button>
    );
}