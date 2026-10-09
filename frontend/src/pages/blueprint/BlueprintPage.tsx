import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    MarkerType,
    type Node,
    type Edge,
    Position,
    Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Box, Typography, Chip, Tooltip } from "@mui/material";

import { graphService } from "../../services/graphService";
import { capabilityService } from "../../services/capabilityService";
import type { Capability } from "../../types/capability";

// Custom node components
const CapabilityNode = ({ data }: any) => {
    const { label, maturity, maturityLabel, subCapabilities } = data;

    const getMaturityColor = (level: number) => {
        if (level === 1) return "#ef4444";
        if (level === 2) return "#f97316";
        if (level === 3) return "#eab308";
        if (level === 4) return "#22c55e";
        return "#64748b";
    };

    const color = getMaturityColor(maturity);

    return (
        <div
            style={{
                background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
                border: `3px solid ${color}`,
                borderRadius: "12px",
                padding: "16px",
                width: "240px",
                color: "white",
                boxShadow: `0 8px 32px ${color}40`,
            }}
        >
            <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

            <div style={{ marginBottom: "12px" }}>
                <div style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#a5b4fc",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "4px"
                }}>
                    Capability
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.3 }}>
                    {label}
                </div>
            </div>

            {maturity && (
                <div style={{ marginBottom: "12px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "6px"
                    }}>
                        <span style={{ fontSize: "24px", fontWeight: 800, color }}>
                            {maturity}
                        </span>
                        <span style={{ fontSize: "12px", color: "#94a3b8", marginLeft: "4px" }}>
                            / T:{data.targetMaturity ?? "N/A"}
                        </span>
                        <span style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            marginLeft: "auto"
                        }}>
                            {maturityLabel}
                        </span>
                    </div>
                    <div style={{
                        height: "6px",
                        background: "#374151",
                        borderRadius: "3px",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            width: `${(maturity / 4) * 100}%`,
                            height: "100%",
                            background: color,
                            borderRadius: "3px",
                            transition: "width 0.5s ease"
                        }} />
                    </div>
                </div>
            )}

            {subCapabilities && subCapabilities.length > 0 && (
                <div style={{
                    borderTop: "1px solid #4338ca",
                    paddingTop: "10px",
                    marginTop: "10px"
                }}>
                    <div style={{
                        fontSize: "10px",
                        color: "#818cf8",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "6px"
                    }}>
                        Sub-capabilities
                    </div>
                    {subCapabilities.map((sub: any, idx: number) => (
                        <div key={idx} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "12px",
                            padding: "3px 0",
                            color: "#c7d2fe"
                        }}>
                            <span>├─ {sub.name}</span>
                            <span style={{
                                color: getMaturityColor(sub.maturity),
                                fontWeight: 600,
                                fontSize: "11px"
                            }}>
                                {sub.maturity} / T:{sub.targetMaturity ?? "-"}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
        </div>
    );
};

const ProcessNode = ({ data }: any) => (
    <div
        style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
            border: "2px solid #3b82f6",
            borderRadius: "10px",
            padding: "14px",
            width: "200px",
            color: "white",
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
        }}
    >
        <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
        <div style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#93c5fd",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "4px"
        }}>
            Business Process
        </div>
        <div style={{ fontSize: "14px", fontWeight: 600 }}>{data.label}</div>
        {data.code && (
            <div style={{ fontSize: "10px", color: "#60a5fa", marginTop: "4px" }}>
                {data.code}
            </div>
        )}
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
);

const ApplicationNode = ({ data }: any) => (
    <div
        style={{
            background: data.isSelected
                ? "linear-gradient(135deg, #064e3b 0%, #059669 100%)"
                : "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
            border: data.isSelected ? "3px solid #34d399" : "2px solid #14b8a6",
            borderRadius: "12px",
            padding: "16px",
            width: data.isSelected ? "260px" : "220px",
            color: "white",
            boxShadow: data.isSelected
                ? "0 12px 40px rgba(52, 211, 153, 0.4)"
                : "0 8px 32px rgba(20, 184, 166, 0.3)",
            transform: data.isSelected ? "scale(1.05)" : "scale(1)",
            transition: "all 0.3s ease",
        }}
    >
        <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

        {data.isSelected && (
            <div style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#10b981",
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: "12px",
                letterSpacing: "0.5px",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)"
            }}>
                ★ SELECTED
            </div>
        )}

        <div style={{
            fontSize: "11px",
            fontWeight: 700,
            color: data.isSelected ? "#6ee7b7" : "#5eead4",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "4px"
        }}>
            Application
        </div>
        <div style={{
            fontSize: data.isSelected ? "16px" : "14px",
            fontWeight: 700
        }}>
            {data.label}
        </div>
        {data.code && (
            <div style={{ fontSize: "10px", color: "#2dd4bf", marginTop: "4px" }}>
                {data.code}
            </div>
        )}
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
);

const TechnologyNode = ({ data }: any) => (
    <div
        style={{
            background: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
            border: "2px solid #f97316",
            borderRadius: "10px",
            padding: "14px",
            width: "200px",
            color: "white",
            boxShadow: "0 8px 32px rgba(249, 115, 22, 0.3)",
        }}
    >
        <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
        <div style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#fdba74",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "4px"
        }}>
            Technology
        </div>
        <div style={{ fontSize: "14px", fontWeight: 600 }}>{data.label}</div>
        {data.techType && (
            <div style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.15)",
                fontSize: "9px",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: "4px",
                marginTop: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
            }}>
                {data.techType}
            </div>
        )}
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
);

const nodeTypes = {
    capability: CapabilityNode,
    process: ProcessNode,
    application: ApplicationNode,
    technology: TechnologyNode,
};

export default function BlueprintPage() {
    const { id } = useParams();
    const artifactId = id ? Number(id) : undefined;

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedArtifact, setSelectedArtifact] = useState<any>(null);
    const [statistics, setStatistics] = useState({
        capabilities: 0,
        processes: 0,
        applications: 0,
        technologies: 0,
    });

    const getMaturityLabel = (level: number): string => {
        if (level === 1) return "Low";
        if (level === 2) return "Developing";
        if (level === 3) return "Good";
        if (level === 4) return "High";
        return "Unknown";
    };

    const buildHierarchy = (capabilities: Capability[]) => {
        const map: Record<number, Capability & { children?: any[] }> = {};
        const roots: any[] = [];

        capabilities.forEach(c => {
            map[c.id] = { ...c, children: [] };
        });

        capabilities.forEach(c => {
            if (c.parentId && map[c.parentId]) {
                map[c.parentId].children!.push(map[c.id]);
            } else {
                roots.push(map[c.id]);
            }
        });

        return { map, roots };
    };

    useEffect(() => {
        if (artifactId) {
            loadBlueprint(artifactId);
        }
    }, [artifactId]);

    async function loadBlueprint(targetId: number) {
        try {
            setLoading(true);

            const [graph, capabilities] = await Promise.all([
                graphService.getArtifactGraph(targetId),
                capabilityService.getAll()
            ]);

            const { map: capabilityMap } = buildHierarchy(capabilities);

            // Find selected artifact
            const selectedNode = graph.nodes.find((n: any) => n.id === targetId);
            setSelectedArtifact(selectedNode);

            // Group nodes by type
            const typeGroups: Record<string, any[]> = {
                CAPABILITY: [],
                PROCESS: [],
                APPLICATION: [],
                TECHNOLOGY: []
            };

            graph.nodes.forEach((node: any) => {
                if (typeGroups[node.type] !== undefined) {
                    typeGroups[node.type].push(node);
                }
            });

            // Update statistics
            setStatistics({
                capabilities: typeGroups.CAPABILITY.length,
                processes: typeGroups.PROCESS.length,
                applications: typeGroups.APPLICATION.length,
                technologies: typeGroups.TECHNOLOGY.length,
            });

            const flowNodes: Node[] = [];
            const layerHeight = 220;
            const startY = 80;

            const layers = [
                { type: "CAPABILITY", label: "🟣 Business Capabilities", color: "#8b5cf6" },
                { type: "PROCESS", label: "🔵 Business Processes", color: "#3b82f6" },
                { type: "APPLICATION", label: "🟢 Applications", color: "#10b981" },
                { type: "TECHNOLOGY", label: "🟠 Technologies", color: "#f97316" }
            ];

            layers.forEach((layer, layerIndex) => {
                const y = startY + layerIndex * layerHeight;
                const layerNodes = typeGroups[layer.type];

                if (!layerNodes || layerNodes.length === 0) return;

                // Layer label node
                flowNodes.push({
                    id: `layer-label-${layer.type}`,
                    position: { x: -600, y: y - 20 },
                    data: { label: layer.label },
                    type: "default",
                    style: {
                        background: "transparent",
                        border: "none",
                        color: layer.color,
                        fontSize: "14px",
                        fontWeight: 700,
                        width: 200,
                    },
                    selectable: false,
                    draggable: false,
                });

                // Layer background
                flowNodes.push({
                    id: `layer-bg-${layer.type}`,
                    position: { x: -350, y: y - 30 },
                    data: {},
                    type: "default",
                    style: {
                        background: `${layer.color}08`,
                        border: `1px solid ${layer.color}20`,
                        borderRadius: "16px",
                        width: Math.max(layerNodes.length * 280 + 100, 800),
                        height: 140,
                        zIndex: -1,
                    },
                    selectable: false,
                    draggable: false,
                });

                const startX = -(layerNodes.length * 280) / 2 + 140;

                layerNodes.forEach((node, index) => {
                    const x = startX + index * 280;
                    const isSelected = node.id === targetId;

                    let nodeData: any = {
                        label: node.label,
                        code: node.code,
                    };

                    let nodeType = "default";

                    if (node.type === "CAPABILITY") {
                        const cap = capabilityMap[node.id];
                        nodeType = "capability";
                        nodeData = {
                            ...nodeData,
                            maturity: cap?.maturityLevel,
                            targetMaturity: cap?.targetMaturity,
                            maturityLabel: getMaturityLabel(cap?.maturityLevel || 0),
                            subCapabilities: cap?.children?.map((c: any) => ({
                                name: c.name,
                                maturity: c.maturityLevel,
                                targetMaturity: c.targetMaturity
                            }))
                        };
                    } else if (node.type === "PROCESS") {
                        nodeType = "process";
                    } else if (node.type === "APPLICATION") {
                        nodeType = "application";
                        nodeData.isSelected = isSelected;
                    } else if (node.type === "TECHNOLOGY") {
                        nodeType = "technology";
                        nodeData.techType = node.techType || "Platform";
                    }

                    flowNodes.push({
                        id: String(node.id),
                        type: nodeType,
                        data: nodeData,
                        position: { x, y },
                    });
                });
            });

            // Create edges with better styling
            const flowEdges: Edge[] = graph.edges.map((edge: any) => {
                const isInterLayer = edge.sourceType !== edge.targetType;

                return {
                    id: String(edge.id),
                    source: String(edge.source),
                    target: String(edge.target),
                    label: edge.type.replaceAll("_", " ").toLowerCase(),
                    type: "smoothstep",
                    animated: isInterLayer,
                    style: {
                        strokeWidth: isInterLayer ? 3 : 2,
                        stroke: isInterLayer ? "#64748b" : "#475569",
                        opacity: 0.8,
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: isInterLayer ? "#64748b" : "#475569",
                        width: 20,
                        height: 20,
                    },
                    labelStyle: {
                        fill: "#94a3b8",
                        fontSize: 11,
                        fontWeight: 500,
                    },
                    labelBgStyle: {
                        fill: "#0f172a",
                        rx: 4,
                    },
                    labelBgPadding: [6, 6],
                    labelBgBorderRadius: 4,
                };
            });

            setNodes(flowNodes);
            setEdges(flowEdges);

        } catch (err) {
            console.error("Failed to load blueprint", err);
        } finally {
            setLoading(false);
        }
    }

    const onNodeClick = useCallback((_: any, node: Node) => {
        // Navigate to blueprint for clicked node
        if (!node.id.startsWith("layer-")) {
            console.log("Navigate to:", node.id);
            // navigate(`/blueprint/${node.id}`);
        }
    }, []);

    if (!artifactId) {
        return (
            <Box sx={{ p: 4, color: "white", textAlign: "center" }}>
                <Typography variant="h6">No artifact selected</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            bgcolor: "#0B1727",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
        }}>
            {/* Header */}
            <Box sx={{
                px: 4,
                py: 3,
                borderBottom: "1px solid #1e293b",
                background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)"
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                        <Typography
                            variant="overline"
                            sx={{
                                color: "#64748b",
                                letterSpacing: 2,
                                fontWeight: 700,
                                fontSize: "11px"
                            }}
                        >
                            ARCHITECTURE BLUEPRINT
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "white", mt: 0.5 }}>
                            {selectedArtifact?.label || "Loading..."}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                            <Chip
                                label={selectedArtifact?.type || "Unknown"}
                                size="small"
                                sx={{
                                    bgcolor: "#1e293b",
                                    color: "#94a3b8",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    fontSize: "10px"
                                }}
                            />
                            <Typography sx={{ color: "#64748b", fontSize: "13px" }}>
                                • {selectedArtifact?.code || `ID-${artifactId}`}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Statistics */}
                    <Box sx={{ display: "flex", gap: 3 }}>
                        {[
                            { label: "Capabilities", value: statistics.capabilities, color: "#8b5cf6" },
                            { label: "Processes", value: statistics.processes, color: "#3b82f6" },
                            { label: "Applications", value: statistics.applications, color: "#10b981" },
                            { label: "Technologies", value: statistics.technologies, color: "#f97316" },
                        ].map((stat) => (
                            <Box key={stat.label} sx={{ textAlign: "center" }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 800,
                                        color: stat.color,
                                        fontSize: "28px",
                                        lineHeight: 1
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography sx={{
                                    color: "#64748b",
                                    fontSize: "10px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    mt: 0.5
                                }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* React Flow Canvas */}
            <Box sx={{ flex: 1, position: "relative" }}>
                {loading ? (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        color: "white",
                        gap: 2
                    }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            border: "3px solid #1e293b",
                            borderTop: "3px solid #3b82f6",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            "@keyframes spin": {
                                "0%": { transform: "rotate(0deg)" },
                                "100%": { transform: "rotate(360deg)" }
                            }
                        }} />
                        <Typography>Loading Architecture Blueprint...</Typography>
                    </Box>
                ) : (
                    <ReactFlowProvider>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodeTypes={nodeTypes}
                            onNodeClick={onNodeClick}
                            fitView
                            fitViewOptions={{ padding: 0.2 }}
                            minZoom={0.1}
                            maxZoom={1.5}
                            defaultEdgeOptions={{
                                type: "smoothstep",
                                animated: true,
                            }}
                        >
                            <Background
                                color="#1e293b"
                                gap={32}
                                size={1}
                            />
                            <Controls
                                style={{
                                    background: "#1e293b",
                                    border: "1px solid #334155",
                                }}
                            />
                            <MiniMap
                                nodeColor={(node) => {
                                    if (node.type === "capability") return "#8b5cf6";
                                    if (node.type === "process") return "#3b82f6";
                                    if (node.type === "application") return "#10b981";
                                    if (node.type === "technology") return "#f97316";
                                    return "#475569";
                                }}
                                maskColor="rgba(15, 23, 42, 0.8)"
                                style={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #1e293b",
                                    borderRadius: "8px",
                                }}
                            />
                        </ReactFlow>
                    </ReactFlowProvider>
                )}
            </Box>

            {/* Legend */}
            <Box sx={{
                px: 4,
                py: 2,
                borderTop: "1px solid #1e293b",
                background: "#0f172a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Box sx={{ display: "flex", gap: 4 }}>
                    <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                        Legend:
                    </Typography>
                    {[
                        { color: "#8b5cf6", label: "Capability" },
                        { color: "#3b82f6", label: "Process" },
                        { color: "#10b981", label: "Application" },
                        { color: "#f97316", label: "Technology" },
                    ].map((item) => (
                        <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: "3px" }} />
                            <Typography sx={{ color: "#94a3b8", fontSize: "12px" }}>
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                    <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                        Maturity:
                    </Typography>
                    {[
                        { level: 1, color: "#ef4444", label: "Low" },
                        { level: 2, color: "#f97316", label: "Developing" },
                        { level: 3, color: "#eab308", label: "Good" },
                        { level: 4, color: "#22c55e", label: "High" },
                    ].map((m) => (
                        <Tooltip key={m.level} title={`Level ${m.level}/4`} arrow>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box sx={{ width: 10, height: 10, bgcolor: m.color, borderRadius: "50%" }} />
                                <Typography sx={{ color: "#94a3b8", fontSize: "11px" }}>
                                    {m.label}
                                </Typography>
                            </Box>
                        </Tooltip>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}