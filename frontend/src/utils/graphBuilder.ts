import type { Node, Edge } from "@xyflow/react";
import type { GraphResponse } from "../types/graph";
import { getArtifactLayer } from "./artifactLayer";
import { getRelationshipRule } from "./relationshipRules";

interface BuildOptions {
    selectedTypes?: Set<string>;
    selectedRelationships?: Set<string>;
    artifactId?: number;
}

export interface BuildResult {
    nodes: Node[];
    edges: Edge[];
}

const NODE_WIDTH = 220;
const NODE_HEIGHT = 90;

/**
 * Normalizes artifact / relationship types so that
 * filtering is not affected by casing or whitespace.
 */
function normalizeType(value: string | undefined): string {
    return String(value ?? "")
        .trim()
        .toUpperCase();
}

export function buildGraph(
    graph: GraphResponse,
    options: BuildOptions
): BuildResult {

    if (!graph) return { nodes: [], edges: [] };

    const {
        selectedTypes,
        selectedRelationships,
        artifactId,
    } = options;

    // -------------------------------------------------
    // Normalize selected filters
    // -------------------------------------------------

    const normalizedTypes = selectedTypes
        ? new Set(
            Array.from(selectedTypes).map(normalizeType)
        )
        : undefined;

    const normalizedRelationships = selectedRelationships
        ? new Set(
            Array.from(selectedRelationships).map(normalizeType)
        )
        : undefined;

    // -------------------------------------------------
    // Relationship filter
    // -------------------------------------------------

    const filteredEdges = (graph.edges || []).filter(edge => {

        const relationshipType =
            normalizeType(edge.type);

        return (
            !normalizedRelationships ||
            normalizedRelationships.has(relationshipType)
        );

    });

    // -------------------------------------------------
    // Determine connected artifacts
    // -------------------------------------------------

    const connected = new Set<number>();

    filteredEdges.forEach(edge => {

        connected.add(edge.source);
        connected.add(edge.target);

    });

    // -------------------------------------------------
    // Node filter
    // -------------------------------------------------

    const filteredNodes = (graph.nodes || []).filter(node => {

        const nodeType =
            normalizeType(node.type);

        const typeMatches =
            !normalizedTypes ||
            normalizedTypes.has(nodeType);

        const isConnected =
            connected.has(node.id);

        const isRoot =
            artifactId !== undefined &&
            node.id === artifactId;

        return (
            typeMatches &&
            (isConnected || isRoot)
        );

    });

    // -------------------------------------------------
    // Existing node IDs
    // -------------------------------------------------

    const nodeIds = new Set<number>(
        filteredNodes.map(node => node.id)
    );

    // -------------------------------------------------
    // React Flow nodes
    // -------------------------------------------------

    const nodes: Node[] = filteredNodes.map(node => {

        const type =
            normalizeType(node.type);

        const layer =
            getArtifactLayer(type);

        return {

            id: String(node.id),

            type: "enterprise",

            position: {
                x: 0,
                y: 0,
            },

            width: NODE_WIDTH,

            height: NODE_HEIGHT,

            data: {

                label: node.label,

                type,

                layer,

                // Useful when styling the root node.
                isRoot:
                    artifactId !== undefined &&
                    node.id === artifactId,

            },

            // Capabilities can be connection sources.
            connectable:
                type === "CAPABILITY",

        };

    });

    // -------------------------------------------------
    // React Flow edges
    // -------------------------------------------------

    const edges: Edge[] = filteredEdges

        .filter(edge =>
            nodeIds.has(edge.source) &&
            nodeIds.has(edge.target)
        )

        .map(edge => {

            const relationshipType =
                normalizeType(edge.type);

            const rule =
                getRelationshipRule(
                    relationshipType
                );

            return {

                id: String(edge.id),

                source: String(edge.source),

                target: String(edge.target),

                type: "smoothstep",

                label:
                    relationshipType.replaceAll(
                        "_",
                        " "
                    ),

                data: {

                    relationshipType,

                    hierarchy:
                        rule.hierarchy,

                    direction:
                        rule.direction,

                    priority:
                        rule.priority,

                    color:
                        rule.color,

                    levelChange:
                        rule.levelChange,

                },

                // Prevent React Flow from making
                // relationship edges appear as
                // user-created connections.
                selectable: true,

                animated: false,

            };

        });

    // -------------------------------------------------
    // Return graph
    // -------------------------------------------------

    return {

        nodes,

        edges,

    };
}