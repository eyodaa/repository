export interface RelationshipArtifact {
    id: number;
    code: string;
    name: string;
}

export interface RelationshipResponse {
    id: number;

    sourceArtifact: RelationshipArtifact;

    targetArtifact: RelationshipArtifact;

    relationshipType: string;

    description: string;
}

export interface CreateRelationshipRequest {
    sourceArtifactId: number;

    targetArtifactId: number;

    relationshipType: string;

    description: string;
}