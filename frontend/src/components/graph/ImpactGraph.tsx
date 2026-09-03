import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    useNodesState,
    useEdgesState,
    type Node,
    type Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useEffect } from "react";

interface Props {
    graph: any;
}

const LEVEL_HEIGHT = 220;
const NODE_WIDTH = 260;
const NODE_GAP = 80;

export default function ImpactGraph({ graph }: Props) {

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    useEffect(() => {

        if (!graph) return;

        //----------------------------------
        // Group nodes by BFS level
        //----------------------------------

        const grouped = new Map<number, any[]>();

        graph.nodes.forEach((node: any) => {

            const level = node.level ?? 0;

            if (!grouped.has(level)) {
                grouped.set(level, []);
            }

            grouped.get(level)!.push(node);

        });

        //----------------------------------
        // Build React Flow nodes
        //----------------------------------

        const flowNodes: any[] = [];

        [...grouped.keys()]
            .sort((a, b) => a - b)
            .forEach(level => {

                const row = grouped.get(level)!;

                const totalWidth =
                    row.length * NODE_WIDTH +
                    (row.length - 1) * NODE_GAP;

                let startX = -totalWidth / 2;

                row.forEach(node => {

                    flowNodes.push({

                        id: String(node.id),

                        position: {
                            x: startX,
                            y: level * LEVEL_HEIGHT,
                        },

                        data: {

                            label: (

                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: 12,
                                    }}
                                >

                                    <strong>
                                        {node.label}
                                    </strong>

                                    <br />

                                    {node.type}

                                    <br />

                                    <strong>
                                        {node.impactLevel}
                                    </strong>

                                    <br />

                                    Dependencies: {node.dependencyCount}

                                </div>

                            ),

                        },

                        style: {

                            width: 220,

                            borderRadius: 12,

                            border: node.root
                                ? "3px solid #d32f2f"
                                : "2px solid white",

                            background: getColor(
                                node.impactLevel
                            ),

                            color: "white",

                            fontWeight: 600,

                            textAlign: "center",

                        },

                    });

                    startX += NODE_WIDTH + NODE_GAP;

                });

            });

        //----------------------------------
        // Build edges
        //----------------------------------

        const flowEdges = graph.edges.map((edge: any) => ({

            id: String(edge.id),

            source: String(edge.source),

            target: String(edge.target),

            label: edge.type,

            animated: true,

            type: "smoothstep",

        }));

        setNodes(flowNodes);

        setEdges(flowEdges);

    }, [graph]);

    return (

        <div
            style={{
                width: "100%",
                height: "85vh",
            }}
        >

            <ReactFlow

                nodes={nodes}

                edges={edges}

                onNodesChange={onNodesChange}

                onEdgesChange={onEdgesChange}

                fitView

                fitViewOptions={{
                    padding: 0.25,
                }}

                nodesDraggable

                panOnDrag

                zoomOnScroll

            >

                <MiniMap />

                <Controls />

                <Background />

            </ReactFlow>

        </div>

    );

}

function getColor(level: string) {

    switch (level) {

        case "ROOT":
            return "#d32f2f";

        case "CRITICAL":
            return "#f57c00";

        case "HIGH":
            return "#fbc02d";

        case "MEDIUM":
            return "#42a5f5";

        default:
            return "#78909c";

    }

}