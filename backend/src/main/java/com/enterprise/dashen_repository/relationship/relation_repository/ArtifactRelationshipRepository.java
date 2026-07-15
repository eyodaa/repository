package com.enterprise.dashen_repository.relationship.relation_repository;

import com.enterprise.dashen_repository.relationship.relation_entity.ArtifactRelationship;
import com.enterprise.dashen_repository.relationship.relation_entity.RelationshipType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArtifactRelationshipRepository extends JpaRepository<ArtifactRelationship, Long> {
    List<ArtifactRelationship> findBySourceArtifactId(Long sourceArtifactId);

    List<ArtifactRelationship> findByTargetArtifactId(Long targetArtifactId);

    boolean existsBySourceArtifactIdAndTargetArtifactIdAndRelationshipType(
            Long sourceArtifactId,
            Long targetArtifactId,
            RelationshipType relationshipType);
}