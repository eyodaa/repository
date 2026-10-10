import { useEffect, useState } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    MarkerType,
    type Node,
    type Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { graphService } from "../../services/graphService";

export default function EnterpriseMap() {

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {

        try {

            const graph = await graphService.getEnterpriseGraph();

            const flowNodes: Node[] = (graph.nodes || []).map(
                (node: any, index: number) => ({

                    id: String(node.id),

                    data: {
                        label: node.label,
                    },

                    position: {
                        x: (index % 5) * 320,
                        y: Math.floor(index / 5) * 220,
                    },

                    style: {
                        background: "#1E293B",
                        color: "white",
                        border: "2px solid #3B82F6",
                        borderRadius: 12,
                        padding: 12,
                        width: 180,
                        textAlign: "center",
                        fontWeight: 600,
                    },

                })
            );

            const flowEdges: Edge[] = (graph.edges || []).map(
                (edge: any) => ({

                    id: String(edge.id),

                    source: String(edge.source),

                    target: String(edge.target),

                    label: edge.type.replaceAll("_", " "),

                    animated: true,

                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },

                    style: {
                        strokeWidth: 2,
                    },

                })
            );

            setNodes(flowNodes);
            setEdges(flowEdges);

        } catch (e) {

            console.error(e);

        }

    }

    return (

        <ReactFlowProvider>

            <div
                style={{
                    width: "100%",
                    height: "100vh",
                }}
            >

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                >

                    <Background />

                    <MiniMap />

                    <Controls />

                </ReactFlow>

            </div>

        </ReactFlowProvider>

    );

}