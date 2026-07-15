package com.enterprise.dashen_repository.relationship.relation_entity;

import com.enterprise.dashen_repository.artifact.entity.Artifact;
import com.enterprise.dashen_repository.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "artifact_relationship")
public class ArtifactRelationship extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "source_artifact_id")
    private Artifact sourceArtifact;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "target_artifact_id")
    private Artifact targetArtifact;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RelationshipType relationshipType;

    @Column(length = 2000)
    private String description;

    public ArtifactRelationship() {
    }

    public Artifact getSourceArtifact() {
        return sourceArtifact;
    }

    public void setSourceArtifact(Artifact sourceArtifact) {
        this.sourceArtifact = sourceArtifact;
    }

    public Artifact getTargetArtifact() {
        return targetArtifact;
    }

    public void setTargetArtifact(Artifact targetArtifact) {
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