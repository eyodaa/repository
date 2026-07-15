package com.enterprise.dashen_repository.relationship.relation_dto;

import com.enterprise.dashen_repository.relationship.relation_entity.RelationshipType;

public class CreateRelationshipRequest {

    private Long sourceArtifactId;
    private Long targetArtifactId;
    private RelationshipType relationshipType;
    private String description;

    public Long getSourceArtifactId() {
        return sourceArtifactId;
    }

    public void setSourceArtifactId(Long sourceArtifactId) {
        this.sourceArtifactId = sourceArtifactId;
    }

    public Long getTargetArtifactId() {
        return targetArtifactId;
    }

    public void setTargetArtifactId(Long targetArtifactId) {
        this.targetArtifactId = targetArtifactId;
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