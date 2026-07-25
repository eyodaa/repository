export interface GraphNode {

    id: number;

    label: string;

    type: string;

}

export interface GraphEdge {

    id: number;

    source: number;

    target: number;

    type: string;

}

export interface GraphResponse {

    nodes: GraphNode[];

    edges: GraphEdge[];

}