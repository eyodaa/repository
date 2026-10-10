import type { GraphNode, GraphEdge } from "../types/graph";
import { getArtifactLayer } from "./artifactLayer";

export interface HierarchyNode {

    id: number;

    /**
     * Architectural layer.
     *
     * 0 = Capability
     * 1 = Process
     * 2 = Application
     * 3 = Technology
     * 4 = Other
     */
    level: number;

    /**
     * Logical parent in the architecture.
     */
    parent?: number;

}

/**
 * Builds the architectural hierarchy of the enterprise graph.
 *
 * IMPORTANT:
 * The architectural level is determined by the artifact type,
 * NOT by graph traversal.
 *
 * Capability
 *     ↓
 * Process
 *     ↓
 * Application
 *     ↓
 * Technology
 */
export function buildHierarchy(
    nodes: GraphNode[],
    edges: GraphEdge[],
    rootId?: number
): Map<number, HierarchyNode> {

    const hierarchy = new Map<number, HierarchyNode>();

    // ----------------------------------------------------
    // 1. Assign architectural layer
    // ----------------------------------------------------

    nodes.forEach(node => {

        const level = getArtifactLayer(node.type);

        hierarchy.set(node.id, {

            id: node.id,

            level,

        });

    });

    // ----------------------------------------------------
    // 2. Determine logical parents
    // ----------------------------------------------------
    //
    // A parent must always be one architectural layer
    // above the child.
    //
    // Capability  → Process
    // Process     → Application
    // Application → Technology
    //
    // Relationships that connect artifacts on the same
    // layer or skip architectural layers do NOT change
    // the hierarchy.
    // ----------------------------------------------------

    edges.forEach(edge => {

        const source = hierarchy.get(edge.source);

        const target = hierarchy.get(edge.target);

        if (!source || !target) {
            return;
        }

        // -----------------------------------------------
        // Source is the parent
        // -----------------------------------------------

        if (target.level === source.level + 1) {

            assignParent(
                hierarchy,
                target.id,
                source.id
            );

            return;

        }

        // -----------------------------------------------
        // Target is the parent
        // -----------------------------------------------

        if (source.level === target.level + 1) {

            assignParent(
                hierarchy,
                source.id,
                target.id
            );

        }

    });

    // ----------------------------------------------------
    // 3. Root handling
    // ----------------------------------------------------
    //
    // rootId is useful when a specific artifact is being
    // displayed. We do NOT change its architectural layer.
    //
    // For example, an Application remains level 2 even
    // when it is the selected/root artifact.
    // ----------------------------------------------------

    if (rootId !== undefined) {

        const root = hierarchy.get(rootId);

        if (root) {

            root.parent = undefined;

        }

    }

    return hierarchy;
}

/**
 * Assign a parent only when the child does not already
 * have a valid parent.
 *
 * This prevents the last relationship in the array from
 * arbitrarily replacing an existing parent.
 */
function assignParent(
    hierarchy: Map<number, HierarchyNode>,
    childId: number,
    parentId: number
): void {

    const child = hierarchy.get(childId);

    if (!child) {
        return;
    }

    if (child.parent === undefined) {

        child.parent = parentId;

    }

}