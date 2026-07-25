import ELK from "elkjs/lib/elk.bundled";
import type { Node, Edge } from "@xyflow/react";

const elk = new ELK();

const NODE_WIDTH = 240;
const NODE_HEIGHT = 100;

function getLayerIndex(type: string = ""): number {
    switch (type.toUpperCase()) {
        case "CAPABILITY":
            return 0;
        case "PROCESS":
            return 1;
        case "APPLICATION":
            return 2;
        case "TECHNOLOGY":
            return 3;
        case "DATABASE":
            return 4;
        case "SERVER":
            return 5;
        default:
            return 10;
    }
}

export async function layoutGraph(nodes: Node[], edges: Edge[]) {
    const graph = {
        id: "enterprise-architecture",
        layoutOptions: {
            "elk.algorithm": "layered",
            "elk.direction": "DOWN",

            // Spacing & Alignment
            "elk.layered.spacing.nodeNodeBetweenLayers": "100",
            "elk.spacing.nodeNode": "80",
            "elk.padding": "[top=60,left=60,bottom=60,right=60]",

            // Enforce strict top-down layer positioning based on layer choices
            "elk.layered.layering.strategy": "INTERACTIVE",
            "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
            "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",

            // Port & Edge Routing (Forces top-to-bottom entry/exit)
            "elk.edgeRouting": "ORTHOGONAL",
            "elk.portConstraints": "FIXED_SIDE",
            "elk.layered.unnecessaryBendpoints": "true",
        },

        children: nodes.map((node) => {
            const layerIdx = getLayerIndex((node.data as any)?.type);

            return {
                id: node.id,
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                layoutOptions: {
                    // Tell ELK to force the node to its specific layer rank
                    "elk.layered.layering.layerId": String(layerIdx),
                },
                // Define explicit entry/exit ports to force clean straight arrows
                ports: [
                    {
                        id: `${node.id}-top`,
                        properties: { "elk.port.side": "NORTH" },
                    },
                    {
                        id: `${node.id}-bottom`,
                        properties: { "elk.port.side": "SOUTH" },
                    },
                ],
            };
        }),

        edges: edges.map((edge) => ({
            id: edge.id,
            sources: [`${edge.source}-bottom`],
            targets: [`${edge.target}-top`],
        })),
    };

    const layout = await elk.layout(graph);

    const layoutedNodes = nodes.map((node) => {
        const elkNode = layout.children?.find((n) => n.id === node.id);

        return {
            ...node,
            // Target handles for React Flow (@xyflow/react)
            targetPosition: "top" as const,
            sourcePosition: "bottom" as const,
            position: {
                x: elkNode?.x ?? 0,
                y: elkNode?.y ?? 0,
            },
        };
    });

    return {
        nodes: layoutedNodes,
        edges,
    };
}