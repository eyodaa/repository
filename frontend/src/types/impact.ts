export interface ImpactNode {
    id: number;
    label: string;
    type: string;

    level: number;
    root: boolean;
    impactLevel: string;
    dependencyCount: number;
}

export interface ImpactEdge {
    id: number;
    source: number;
    target: number;
    type: string;
}

export interface ImpactGraph {
    nodes: ImpactNode[];
    edges: ImpactEdge[];
}