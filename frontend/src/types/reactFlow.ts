import type { Node } from "@xyflow/react";

export interface BuildingNodeData extends Record<string, unknown> {
    label: string;
    type: string;
}

export type BuildingNode = Node<BuildingNodeData>;