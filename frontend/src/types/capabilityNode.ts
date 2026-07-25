export interface CapabilityNode {

    id: number;

    code: string;

    name: string;

    description: string;

    level: number;

    currentMaturity: number;

    targetMaturity: number;

    displayOrder: number;

    parent?: CapabilityNode;

}