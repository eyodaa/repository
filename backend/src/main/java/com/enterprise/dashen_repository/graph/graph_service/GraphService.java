package com.enterprise.dashen_repository.graph.graph_service;

import com.enterprise.dashen_repository.artifact.artifact_repository.ArtifactRepository;
import com.enterprise.dashen_repository.artifact.entity.Artifact;
import com.enterprise.dashen_repository.graph.graph_dto.GraphEdge;
import com.enterprise.dashen_repository.graph.graph_dto.GraphNode;
import com.enterprise.dashen_repository.graph.graph_dto.GraphResponse;
import com.enterprise.dashen_repository.graph.graph_dto.NeighborDto;
import com.enterprise.dashen_repository.graph.graph_dto.NeighborResponse;
import com.enterprise.dashen_repository.graph.graph_dto.TreeNode;
import com.enterprise.dashen_repository.relationship.relation_entity.ArtifactRelationship;
import com.enterprise.dashen_repository.relationship.relation_repository.ArtifactRelationshipRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GraphService {

    private final ArtifactRepository artifactRepository;
    private final ArtifactRelationshipRepository relationshipRepository;

    public GraphService(
            ArtifactRepository artifactRepository,
            ArtifactRelationshipRepository relationshipRepository) {

        this.artifactRepository = artifactRepository;
        this.relationshipRepository = relationshipRepository;
    }

    public GraphResponse getGraph() {

        List<GraphNode> nodes = artifactRepository.findAll()
                .stream()
                .map(this::mapNode)
                .collect(Collectors.toList());

        List<GraphEdge> edges = relationshipRepository.findAll()
                .stream()
                .map(this::mapEdge)
                .collect(Collectors.toList());

        return new GraphResponse(nodes, edges);
    }

    private GraphNode mapNode(Artifact artifact) {

        return new GraphNode(
                artifact.getId(),
                artifact.getName(),
                artifact.getArtifactType().name());
    }

    private GraphEdge mapEdge(ArtifactRelationship relationship) {

        return new GraphEdge(
                relationship.getId(),
                relationship.getSourceArtifact().getId(),
                relationship.getTargetArtifact().getId(),
                relationship.getRelationshipType().name());
    }

    public NeighborResponse getNeighbors(Long artifactId) {

        Artifact artifact = artifactRepository.findById(artifactId)
                .orElseThrow(() -> new RuntimeException("Artifact not found"));

        List<NeighborDto> neighbors = new ArrayList<>();

        List<ArtifactRelationship> outgoing = relationshipRepository.findBySourceArtifactId(artifactId);

        for (ArtifactRelationship relationship : outgoing) {

            Artifact target = relationship.getTargetArtifact();

            neighbors.add(new NeighborDto(
                    target.getId(),
                    target.getName(),
                    relationship.getRelationshipType().name(),
                    "OUTGOING"));
        }

        List<ArtifactRelationship> incoming = relationshipRepository.findByTargetArtifactId(artifactId);

        for (ArtifactRelationship relationship : incoming) {

            Artifact source = relationship.getSourceArtifact();

            neighbors.add(new NeighborDto(
                    source.getId(),
                    source.getName(),
                    relationship.getRelationshipType().name(),
                    "INCOMING"));
        }

        GraphNode center = new GraphNode(
                artifact.getId(),
                artifact.getName(),
                artifact.getArtifactType().name());

        return new NeighborResponse(center, neighbors);
    }

    private TreeNode buildTree(Artifact artifact) {

        TreeNode node = new TreeNode(
                artifact.getId(),
                artifact.getName(),
                artifact.getArtifactType().name());

        List<ArtifactRelationship> relationships = relationshipRepository.findBySourceArtifactId(artifact.getId());

        for (ArtifactRelationship relationship : relationships) {

            Artifact child = relationship.getTargetArtifact();

            node.getChildren().add(buildTree(child));
        }

        return node;
    }

    public TreeNode getDependencyTree(Long artifactId) {

        Artifact root = artifactRepository.findById(artifactId)
                .orElseThrow(() -> new RuntimeException("Artifact not found"));

        return buildTree(root);
    }
}