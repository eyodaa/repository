import { useEffect, useState, useImperativeHandle, forwardRef, useCallback } from "react";

import {
    ReactFlow,
    Background,
    Controls,
    MarkerType,
    BackgroundVariant,
    useNodesState,
    useEdgesState,
} from "@xyflow/react";

import type {
    Node,
    Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import EnterpriseNode from "./nodes/EnterpriseNode";
import { graphService } from "../../services/graphService";
import type { GraphResponse } from "../../types/graph";

import { layoutGraph } from "../../utils/elkLayout";

interface EnterpriseGraphProps {
    artifactId?: number;
    height?: number | string;
    selectedTypes?: Set<string>;
}

export interface EnterpriseGraphRef {
    fitView: () => void;
    reLayout: () => void;
}

const nodeTypes = {
    enterprise: EnterpriseNode,
};

const NODE_WIDTH = 220;
const NODE_HEIGHT = 90;

const EnterpriseGraph = forwardRef<EnterpriseGraphRef, EnterpriseGraphProps>(({
    artifactId,
    height = "100%",
    selectedTypes,
}, ref) => {
    // 1. Use React Flow's built-in state hooks
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [loading, setLoading] = useState(true);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    const loadGraph = useCallback(async () => {
        try {
            setLoading(true);

            let graph: GraphResponse;

            if (artifactId) {
                graph = await graphService.getArtifactGraph(artifactId);
            } else {
                graph = await graphService.getEnterpriseGraph();
            }

            // Filter nodes based on selectedTypes
            const filteredNodes = selectedTypes
                ? graph.nodes.filter(node => selectedTypes.has(node.type.toUpperCase()))
                : graph.nodes;

            const flowNodes: Node[] = filteredNodes.map(node => ({
                id: String(node.id),
                type: "enterprise",
                position: {
                    x: 0,
                    y: 0,
                },
                data: {
                    label: node.label,
                    type: node.type,
                },
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                connectable: node.type.toUpperCase() === "CAPABILITY",
            }));

            // Filter edges to only include edges between filtered nodes
            const nodeIds = new Set(flowNodes.map(n => n.id));
            const flowEdges: Edge[] = graph.edges
                .filter(edge => 
                    nodeIds.has(String(edge.source)) && nodeIds.has(String(edge.target))
                )
                .map(edge => ({
                    id: String(edge.id),
                    source: String(edge.source),
                    target: String(edge.target),
                    label: edge.type
                        .replaceAll("_", " ")
                        .toUpperCase(),
                    type: "smoothstep",
                    animated: false,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 18,
                        height: 18,
                    },
                    style: {
                        strokeWidth: 2,
                        stroke: "#64748b",
                    },
                    labelStyle: {
                        fill: "#ffffff",
                        fontWeight: 600,
                        fontSize: 11,
                    },
                    labelBgStyle: {
                        fill: "#1e293b",
                    },
                    labelBgPadding: [6, 3],
                    labelBgBorderRadius: 5,
                }));

            const layouted = await layoutGraph(
                flowNodes,
                flowEdges
            );

            // Cast type if ELK returns generic object instead of ReactFlow Node[] / Edge[]
            setNodes(layouted.nodes as Node[]);
            setEdges(layouted.edges as Edge[]);

        } catch (err) {
            console.error("Error loading graph layout:", err);
        } finally {
            setLoading(false);
        }
    }, [artifactId, selectedTypes, setNodes, setEdges]);

    useImperativeHandle(ref, () => ({
        fitView: () => {
            if (reactFlowInstance) {
                reactFlowInstance.fitView({ padding: 0.2, duration: 600 });
            }
        },
        reLayout: () => {
            loadGraph();
        },
    }));

    useEffect(() => {
        loadGraph();
    }, [loadGraph]);

    if (loading) {
        return (
            <div
                style={{
                    width: "100%",
                    height,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: 18,
                }}
            >
                Loading Graph...
            </div>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                height,
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                    duration: 600,
                }}
                nodesDraggable
                panOnDrag
                panOnScroll
                zoomOnScroll
                zoomOnPinch
                zoomOnDoubleClick={false}
                nodesConnectable
                elementsSelectable
                proOptions={{
                    hideAttribution: true,
                }}
                defaultEdgeOptions={{
                    animated: false,
                }}
                onInit={setReactFlowInstance}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={22}
                    size={1}
                />
                <Controls />
            </ReactFlow>
        </div>
    );
});

EnterpriseGraph.displayName = 'EnterpriseGraph';

export default EnterpriseGraph;