export interface CapabilityTreeNode {

    id: number;

    code: string;

    name: string;

    level: number;

    parentId?: number;

    children: CapabilityTreeNode[];

}