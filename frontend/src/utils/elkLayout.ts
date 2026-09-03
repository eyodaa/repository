import ELK from "elkjs/lib/elk.bundled";
import { Position, type Node, type Edge } from "@xyflow/react";

import { buildHierarchy } from "./graphHierarchy";
import { getRelationshipRule } from "./relationshipRules";

const elk = new ELK();

const NODE_WIDTH = 240;
const NODE_HEIGHT = 100;

export async function layoutGraph(
    nodes: Node[],
    edges: Edge[],
    rootId?: number
) {

    // -------------------------------------------------------
    // Build hierarchy
    // -------------------------------------------------------

    const hierarchy = buildHierarchy(

        nodes.map(node => ({
            id: Number(node.id),

            label: String(
                (node.data as any)?.label ?? ""
            ),

            type: String(
                (node.data as any)?.type ?? ""
            ),
        })),

        edges.map(edge => ({
            id: Number(edge.id),

            source: Number(edge.source),

            target: Number(edge.target),

            type: String(
                (edge.data as any)?.relationshipType ?? ""
            ),
        })),

        rootId
    );

    // -------------------------------------------------------
    // Build ELK edges
    // -------------------------------------------------------

    const elkEdges = edges.map(edge => {

        const relationshipType =
            String(
                (edge.data as any)?.relationshipType ?? ""
            ).toUpperCase();

        const rule =
            getRelationshipRule(
                relationshipType
            );

        /*
         * Vertical relationships:
         *
         * Capability
         *      ↓
         * Process
         *      ↓
         * Application
         *      ↓
         * Technology
         *
         * These use:
         *
         * source = bottom
         * target = top
         */

        if (
            rule.direction === "DOWN"
        ) {

            return {

                id: String(edge.id),

                sources: [
                    `${edge.source}-bottom-source`
                ],

                targets: [
                    `${edge.target}-top-target`
                ],

            };

        }

        /*
         * RIGHT relationships:
         *
         * Application ─────> Application
         *
         * or same-layer relationships
         * that should flow to the right.
         */

        if (
            rule.direction === "RIGHT"
        ) {

            return {

                id: String(edge.id),

                sources: [
                    `${edge.source}-right-source`
                ],

                targets: [
                    `${edge.target}-left-target`
                ],

            };

        }

        /*
         * LEFT relationships.
         */

        if (
            rule.direction === "LEFT"
        ) {

            return {

                id: String(edge.id),

                sources: [
                    `${edge.source}-left-source`
                ],

                targets: [
                    `${edge.target}-right-target`
                ],

            };

        }

        /*
         * SAME relationships.
         *
         * These don't participate in the hierarchy.
         *
         * We still connect them using the side handles
         * so React Flow can display the relationship.
         */

        return {

            id: String(edge.id),

            sources: [
                `${edge.source}-right-source`
            ],

            targets: [
                `${edge.target}-left-target`
            ],

        };

    });

    // -------------------------------------------------------
    // Build ELK children
    // -------------------------------------------------------

    const children = nodes.map(node => {

        const nodeId =
            Number(node.id);

        const level =
            hierarchy.get(nodeId)?.level ?? 0;

        return {

            id: String(node.id),

            width: NODE_WIDTH,

            height: NODE_HEIGHT,

            /*
             * Keep the architectural layer.
             *
             * 0 = Capability
             * 1 = Process
             * 2 = Application
             * 3 = Technology
             */

            layoutOptions: {

                "elk.layered.layering.layerId":
                    String(level),

            },

            ports: [

                // ------------------------------------------------
                // TOP
                // ------------------------------------------------

                {

                    id: `${node.id}-top-target`,

                    properties: {

                        "elk.port.side":
                            "NORTH",

                    },

                },

                // ------------------------------------------------
                // BOTTOM
                // ------------------------------------------------

                {

                    id: `${node.id}-bottom-source`,

                    properties: {

                        "elk.port.side":
                            "SOUTH",

                    },

                },

                // ------------------------------------------------
                // LEFT
                // ------------------------------------------------

                {

                    id: `${node.id}-left-target`,

                    properties: {

                        "elk.port.side":
                            "WEST",

                    },

                },

                // ------------------------------------------------
                // RIGHT
                // ------------------------------------------------

                {

                    id: `${node.id}-right-source`,

                    properties: {

                        "elk.port.side":
                            "EAST",

                    },

                },

            ],

        };

    });

    // -------------------------------------------------------
    // ELK graph
    // -------------------------------------------------------

    const graph = {

        id: "enterprise",

        layoutOptions: {

            "elk.algorithm":
                "layered",

            "elk.direction":
                "DOWN",

            "elk.spacing.nodeNode":
                "80",

            "elk.layered.spacing.nodeNodeBetweenLayers":
                "150",

            "elk.padding":
                "[top=60,left=60,bottom=60,right=60]",

            /*
             * Orthogonal routing gives us clean
             * enterprise-architecture style connectors.
             */

            "elk.edgeRouting":
                "ORTHOGONAL",

            /*
             * Reduce edge crossings.
             */

            "elk.layered.crossingMinimization.strategy":
                "LAYER_SWEEP",

            /*
             * Keep nodes distributed cleanly.
             */

            "elk.layered.nodePlacement.strategy":
                "NETWORK_SIMPLEX",

            /*
             * Allow explicit ports.
             */

            "elk.portConstraints":
                "FIXED_SIDE",

            /*
             * Consider port positions when routing.
             */

            "elk.layered.considerModelOrder":
                "true",

        },

        children,

        edges: elkEdges,

    };

    // -------------------------------------------------------
    // Run ELK
    // -------------------------------------------------------

    const result =
        await elk.layout(graph);

    // -------------------------------------------------------
    // Apply ELK positions to React Flow nodes
    // -------------------------------------------------------

    const layoutedNodes =
        nodes.map(node => {

            const elkNode =
                result.children?.find(
                    child =>
                        child.id === node.id
                );

            return {

                ...node,

                position: {

                    x: elkNode?.x ?? 0,

                    y: elkNode?.y ?? 0,

                },

                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,

            };

        });

    // -------------------------------------------------------
    // Return
    // -------------------------------------------------------

    return {

        nodes: layoutedNodes,

        edges,

    };

}