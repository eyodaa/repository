import { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Breadcrumbs,
    Link,
    Typography,
    Drawer,
    IconButton,
    Toolbar,
    AppBar,
    Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import RefreshIcon from "@mui/icons-material/Refresh";

import LeftPanel from "../../components/graph/LeftPanel";
import RightPanel from "../../components/graph/RightPanel";
import EnterpriseGraph, {
    type EnterpriseGraphRef,
} from "../../components/graph/EnterpriseGraph";

const LEFT_WIDTH = 320;
const RIGHT_WIDTH = 360;

export default function GraphPage() {
    const { id } = useParams();
    const artifactId = id ? Number(id) : undefined;

    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);

    // Active artifact type filters (Capabilities, Processes, Applications, Technologies)
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(
        new Set(["CAPABILITY", "PROCESS", "APPLICATION", "TECHNOLOGY"])
    );

    // Imperative handle to trigger React Flow actions on EnterpriseGraph
    const graphRef = useRef<EnterpriseGraphRef>(null);

    const handleToggleType = (type: string) => {
        setSelectedTypes((prev) => {
            const next = new Set(prev);
            if (next.has(type)) {
                next.delete(type);
            } else {
                next.add(type);
            }
            return next;
        });
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#0f172a",
                color: "white",
            }}
        >
            {/* Header & Breadcrumb Info */}
            <Box sx={{ px: 4, pt: 3 }}>
                <Breadcrumbs sx={{ mb: 1, color: "#94a3b8" }}>
                    <Link underline="hover" color="inherit" href="/">
                        Repository
                    </Link>
                    <Typography sx={{ color: "#e2e8f0" }}>
                        {artifactId ? `Artifact ${artifactId}` : "Enterprise"}
                    </Typography>
                    <Typography sx={{ color: "#38bdf8" }}>
                        Dependency Graph
                    </Typography>
                </Breadcrumbs>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        letterSpacing: "-0.02em",
                    }}
                >
                    {artifactId
                        ? "Artifact Dependency Graph"
                        : "Enterprise Relationship Graph"}
                </Typography>
            </Box>

            {/* Control Toolbar */}
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: "#111c31",
                    borderTop: "1px solid #23324d",
                    borderBottom: "1px solid #23324d",
                }}
            >
                <Toolbar variant="dense">
                    <Tooltip title="Filters & Repository Navigator">
                        <IconButton
                            color="inherit"
                            onClick={() => setLeftOpen(true)}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ flex: 1 }} />

                    {/* Fit Graph to Viewport */}
                    <Tooltip title="Fit View">
                        <IconButton
                            color="inherit"
                            onClick={() => graphRef.current?.fitView()}
                        >
                            <FitScreenIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Trigger ELK Re-layout */}
                    <Tooltip title="Auto Layout">
                        <IconButton
                            color="inherit"
                            onClick={() => graphRef.current?.reLayout()}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Analytics & Metadata">
                        <IconButton
                            color="inherit"
                            onClick={() => setRightOpen(true)}
                            edge="end"
                        >
                            <AnalyticsIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            {/* Main Canvas Area */}
            <Box
                sx={{
                    flex: 1,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <EnterpriseGraph
                    ref={graphRef}
                    artifactId={artifactId}
                    selectedTypes={selectedTypes}
                    height="100%"
                />
            </Box>


            <Drawer
                anchor="left"
                open={leftOpen}
                onClose={() => setLeftOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: LEFT_WIDTH,
                            bgcolor: "#162338",
                            color: "white",
                            p: 2,
                            borderRight: "1px solid #23324d",
                        },
                    },
                }}
            >
                <LeftPanel
                    selectedTypes={selectedTypes}
                    onToggleType={handleToggleType}
                />
            </Drawer>


            <Drawer
                anchor="right"
                open={rightOpen}
                onClose={() => setRightOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: RIGHT_WIDTH,
                            bgcolor: "#162338",
                            color: "white",
                            p: 2,
                            borderLeft: "1px solid #23324d",
                        },
                    },
                }}
            >
                <RightPanel />
            </Drawer>
        </Box>
    );
}

