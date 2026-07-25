import type { Node } from "@xyflow/react";

export interface BuildingNodeData {
    label: string;
    type: string;
}

export type BuildingNode = Node<BuildingNodeData>;