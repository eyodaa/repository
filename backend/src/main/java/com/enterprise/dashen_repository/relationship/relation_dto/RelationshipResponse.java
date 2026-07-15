package com.enterprise.dashen_repository.relationship.relation_dto;

import com.enterprise.dashen_repository.relationship.relation_entity.RelationshipType;

public class RelationshipResponse {

    private Long id;

    private RelationshipArtifactResponse sourceArtifact;

    private RelationshipArtifactResponse targetArtifact;

    private RelationshipType relationshipType;

    private String description;

    public RelationshipResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RelationshipArtifactResponse getSourceArtifact() {
        return sourceArtifact;
    }

    public void setSourceArtifact(RelationshipArtifactResponse sourceArtifact) {
        this.sourceArtifact = sourceArtifact;
    }

    public RelationshipArtifactResponse getTargetArtifact() {
        return targetArtifact;
    }

    public void setTargetArtifact(RelationshipArtifactResponse targetArtifact) {
        this.targetArtifact = targetArtifact;
    }

    public RelationshipType getRelationshipType() {
        return relationshipType;
    }

    public void setRelationshipType(RelationshipType relationshipType) {
        this.relationshipType = relationshipType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}