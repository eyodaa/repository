package com.enterprise.dashen_repository.relationship.relation_service;

import com.enterprise.dashen_repository.artifact.artifact_repository.ArtifactRepository;
import com.enterprise.dashen_repository.artifact.entity.Artifact;
import com.enterprise.dashen_repository.relationship.relation_dto.CreateRelationshipRequest;
import com.enterprise.dashen_repository.relationship.relation_dto.RelationshipArtifactResponse;
import com.enterprise.dashen_repository.relationship.relation_dto.RelationshipResponse;
import com.enterprise.dashen_repository.relationship.relation_entity.ArtifactRelationship;
import com.enterprise.dashen_repository.relationship.relation_repository.ArtifactRelationshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArtifactRelationshipService {

    private final ArtifactRelationshipRepository relationshipRepository;
    private final ArtifactRepository artifactRepository;

    public ArtifactRelationshipService(
            ArtifactRelationshipRepository relationshipRepository,
            ArtifactRepository artifactRepository) {

        this.relationshipRepository = relationshipRepository;
        this.artifactRepository = artifactRepository;
    }

    public RelationshipResponse create(CreateRelationshipRequest request) {

        if (relationshipRepository.existsBySourceArtifactIdAndTargetArtifactIdAndRelationshipType(
                request.getSourceArtifactId(),
                request.getTargetArtifactId(),
                request.getRelationshipType())) {

            throw new RuntimeException("Relationship already exists");
        }

        Artifact source = artifactRepository.findById(request.getSourceArtifactId())
                .orElseThrow(() -> new RuntimeException("Source artifact not found"));

        Artifact target = artifactRepository.findById(request.getTargetArtifactId())
                .orElseThrow(() -> new RuntimeException("Target artifact not found"));

        ArtifactRelationship relationship = new ArtifactRelationship();

        relationship.setSourceArtifact(source);
        relationship.setTargetArtifact(target);
        relationship.setRelationshipType(request.getRelationshipType());
        relationship.setDescription(request.getDescription());

        ArtifactRelationship saved = relationshipRepository.save(relationship);

        return map(saved);
    }

    public List<RelationshipResponse> findAll() {

        return relationshipRepository.findAll()
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    public RelationshipResponse findById(Long id) {

        ArtifactRelationship relationship = relationshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Relationship not found"));

        return map(relationship);
    }

    public void delete(Long id) {
        relationshipRepository.deleteById(id);
    }

    public List<RelationshipResponse> findByArtifactId(Long artifactId) {
        List<ArtifactRelationship> relationships = relationshipRepository
                .findBySourceArtifactIdOrTargetArtifactId(artifactId, artifactId);

        return relationships.stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    private RelationshipResponse map(ArtifactRelationship relationship) {

        RelationshipResponse response = new RelationshipResponse();

        response.setId(relationship.getId());

        RelationshipArtifactResponse source = new RelationshipArtifactResponse();
        source.setId(relationship.getSourceArtifact().getId());
        source.setCode(relationship.getSourceArtifact().getCode());
        source.setName(relationship.getSourceArtifact().getName());

        RelationshipArtifactResponse target = new RelationshipArtifactResponse();
        target.setId(relationship.getTargetArtifact().getId());
        target.setCode(relationship.getTargetArtifact().getCode());
        target.setName(relationship.getTargetArtifact().getName());

        response.setSourceArtifact(source);
        response.setTargetArtifact(target);
        response.setRelationshipType(relationship.getRelationshipType());
        response.setDescription(relationship.getDescription());

        return response;
    }

}