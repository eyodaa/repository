package com.enterprise.dashen_repository.relationship.relation_repository;

import com.enterprise.dashen_repository.relationship.relation_entity.ArtifactRelationship;
import com.enterprise.dashen_repository.relationship.relation_entity.RelationshipType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArtifactRelationshipRepository extends JpaRepository<ArtifactRelationship, Long> {

        List<ArtifactRelationship> findBySourceArtifactId(Long sourceArtifactId);

        List<ArtifactRelationship> findByTargetArtifactId(Long targetArtifactId);

        List<ArtifactRelationship> findBySourceArtifactIdOrTargetArtifactId(
                        Long sourceArtifactId,
                        Long targetArtifactId);

        boolean existsBySourceArtifactIdAndTargetArtifactIdAndRelationshipType(
                        Long sourceArtifactId,
                        Long targetArtifactId,
                        RelationshipType relationshipType);

        List<ArtifactRelationship> findBySourceArtifactIdInOrTargetArtifactIdIn(
                        List<Long> sourceIds,
                        List<Long> targetIds);

        @Query("""
                        SELECT r
                        FROM ArtifactRelationship r
                        JOIN FETCH r.sourceArtifact
                        JOIN FETCH r.targetArtifact
                        WHERE r.sourceArtifact.id = :artifactId
                                OR r.targetArtifact.id = :artifactId
                        """)
        List<ArtifactRelationship> findConnectedRelationships(Long artifactId);
}
