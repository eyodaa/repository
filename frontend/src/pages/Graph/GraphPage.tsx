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

import ImageIcon from "@mui/icons-material/Image";
import CodeIcon from "@mui/icons-material/Code";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

import LeftPanel from "../../components/graph/LeftPanel";
import RightPanel from "../../components/graph/RightPanel";
import EnterpriseGraph from "../../components/graph/EnterpriseGraph";
import type { EnterpriseGraphRef } from "../../components/graph/EnterpriseGraph";

const LEFT_WIDTH = 320;
const RIGHT_WIDTH = 360;

export default function GraphPage() {

    const { id } = useParams();

    const artifactId = id ? Number(id) : undefined;

    const graphRef = useRef<EnterpriseGraphRef>(null);

    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);

    //---------------------------------------------------------
    // Artifact Filters
    //---------------------------------------------------------

    const [selectedTypes, setSelectedTypes] =
        useState<Set<string>>(

            new Set([
                "CAPABILITY",
                "PROCESS",
                "APPLICATION",
                "TECHNOLOGY",
            ])

        );

    //---------------------------------------------------------
    // Relationship Filters
    //---------------------------------------------------------

    const [selectedRelationships, setSelectedRelationships] =
        useState<Set<string>>(

            new Set([
                "SUPPORTS",
                "SUPPORTED_BY",
                "REALIZES",
                "REALIZED_BY",
                "ENABLES",
                "ENABLED_BY",
                "USES",
                "USED_BY",
                "DEPENDS_ON",
                "REQUIRED_BY",
                "HOSTS",
                "HOSTED_ON",
                "CONNECTS_TO",
                "CONSUMES",
                "PROVIDED_BY",
                "IMPLEMENTS",
                "IMPLEMENTED_BY",
                "OWNS",
                "OWNED_BY",
                "MANAGES",
                "MANAGED_BY",
                "BELONGS_TO",
                "CONTAINS",
                "ASSOCIATED_WITH",
            ])

        );

    //---------------------------------------------------------
    // Toggle Artifact Type
    //---------------------------------------------------------

    const handleToggleType = (type: string) => {

        setSelectedTypes(prev => {

            const next = new Set(prev);

            if (next.has(type)) {

                next.delete(type);

            } else {

                next.add(type);

            }

            return next;

        });

    };

    //---------------------------------------------------------
    // Toggle Relationship
    //---------------------------------------------------------

    const handleToggleRelationship = (relationship: string) => {

        setSelectedRelationships(prev => {

            const next = new Set(prev);

            if (next.has(relationship)) {

                next.delete(relationship);

            } else {

                next.add(relationship);

            }

            return next;

        });

    };

    return (

        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#0B1727",
                color: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
        >

            {/* Header */}

            <Box sx={{ px: 4, pt: 3 }}>

                <Breadcrumbs
                    sx={{
                        mb: 1,
                        color: "#94a3b8",
                    }}
                >

                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                    >
                        Repository
                    </Link>

                    <Typography color="#e2e8f0">

                        {artifactId
                            ? `Artifact ${artifactId}`
                            : "Enterprise"}

                    </Typography>

                    <Typography color="#38bdf8">

                        Dependency Graph

                    </Typography>

                </Breadcrumbs>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                    }}
                >

                    {artifactId
                        ? "Artifact Dependency Graph"
                        : "Enterprise Relationship Graph"}

                </Typography>

            </Box>

            {/* Toolbar */}

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

                    <Tooltip title="Repository Navigator">

                        <IconButton
                            color="inherit"
                            onClick={() => setLeftOpen(true)}
                        >

                            <MenuIcon />

                        </IconButton>

                    </Tooltip>

                    <Box sx={{ flex: 1 }} />

                    {/* Fit */}

                    <Tooltip title="Fit Graph">

                        <IconButton
                            color="inherit"
                            onClick={() =>
                                graphRef.current?.fitView()
                            }
                        >

                            <FitScreenIcon />

                        </IconButton>

                    </Tooltip>

                    {/* Layout */}

                    <Tooltip title="Auto Layout">

                        <IconButton
                            color="inherit"
                            onClick={() =>
                                graphRef.current?.reLayout()
                            }
                        >

                            <RefreshIcon />

                        </IconButton>

                    </Tooltip>

                    {/* Export PNG */}

                    <Tooltip title="Export PNG">

                        <IconButton
                            color="inherit"
                            onClick={() =>
                                graphRef.current?.exportPNG()
                            }
                        >

                            <ImageIcon />

                        </IconButton>

                    </Tooltip>

                    {/* Export SVG */}

                    <Tooltip title="Export SVG">

                        <IconButton
                            color="inherit"
                            onClick={() =>
                                graphRef.current?.exportSVG()
                            }
                        >

                            <PhotoLibraryIcon />

                        </IconButton>

                    </Tooltip>

                    {/* Export JSON */}

                    <Tooltip title="Export JSON">

                        <IconButton
                            color="inherit"
                            onClick={() =>
                                graphRef.current?.exportJSON()
                            }
                        >

                            <CodeIcon />

                        </IconButton>

                    </Tooltip>
                    {/* Export XML */}
                    <Tooltip title="Export XML">
                        <IconButton
                            color="inherit"
                            onClick={() => graphRef.current?.exportXML()}
                        >
                            <CodeIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Right Panel */}

                    <Tooltip title="Analytics">

                        <IconButton
                            color="inherit"
                            onClick={() => setRightOpen(true)}
                        >

                            <AnalyticsIcon />

                        </IconButton>

                    </Tooltip>

                </Toolbar>

            </AppBar>

            {/* Graph */}

            <Box
                sx={{
                    flex: 1,
                    overflow: "hidden",
                }}
            >

                <EnterpriseGraph
                    ref={graphRef}
                    artifactId={artifactId}
                    selectedTypes={selectedTypes}
                    selectedRelationships={selectedRelationships}
                    height="100%"
                />

            </Box>

            {/* Left Drawer */}

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
                        },
                    },
                }}
            >

                <LeftPanel
                    selectedTypes={selectedTypes}
                    onToggleType={handleToggleType}
                    selectedRelationships={selectedRelationships}
                    onToggleRelationship={handleToggleRelationship}
                />

            </Drawer>

            {/* Right Drawer */}

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
                        },
                    },
                }}
            >

                <RightPanel />

            </Drawer>

        </Box>

    );

}