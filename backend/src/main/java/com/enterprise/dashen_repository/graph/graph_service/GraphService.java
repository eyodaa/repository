package com.enterprise.dashen_repository.graph.graph_service;

import com.enterprise.dashen_repository.artifact.artifact_repository.ArtifactRepository;
import com.enterprise.dashen_repository.artifact.entity.Artifact;
import com.enterprise.dashen_repository.graph.graph_dto.GraphEdge;
import com.enterprise.dashen_repository.graph.graph_dto.GraphNode;
import com.enterprise.dashen_repository.graph.graph_dto.GraphResponse;
import com.enterprise.dashen_repository.graph.graph_dto.NeighborDto;
import com.enterprise.dashen_repository.graph.graph_dto.NeighborResponse;
import com.enterprise.dashen_repository.graph.graph_dto.TreeNode;
import com.enterprise.dashen_repository.graph.graph_dto.TraversalNode;
import com.enterprise.dashen_repository.relationship.relation_entity.ArtifactRelationship;
import com.enterprise.dashen_repository.relationship.relation_repository.ArtifactRelationshipRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;
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

        private GraphNode mapImpactNode(
                        Artifact artifact,
                        int level,
                        boolean root,
                        int dependencyCount) {

                return new GraphNode(
                                artifact.getId(),
                                artifact.getName(),
                                artifact.getArtifactType().name(),
                                level,
                                root,
                                calculateImpactLevel(level),
                                dependencyCount);
        }

        private String calculateImpactLevel(int level) {

                switch (level) {
                        case 0:
                                return "ROOT";
                        case 1:
                                return "CRITICAL";
                        case 2:
                                return "HIGH";
                        case 3:
                                return "MEDIUM";
                        default:
                                return "LOW";
                }
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

                GraphNode center = mapNode(artifact);

                return new NeighborResponse(center, neighbors);
        }

        private TreeNode buildTree(Artifact artifact, Set<Long> visited) {

                TreeNode node = new TreeNode(
                                artifact.getId(),
                                artifact.getName(),
                                artifact.getArtifactType().name());

                if (visited.contains(artifact.getId())) {
                        return node;
                }

                visited.add(artifact.getId());

                List<ArtifactRelationship> relationships = relationshipRepository
                                .findBySourceArtifactId(artifact.getId());

                for (ArtifactRelationship relationship : relationships) {

                        Artifact child = relationship.getTargetArtifact();

                        node.getChildren().add(buildTree(child, visited));
                }

                return node;
        }

        public TreeNode getDependencyTree(Long artifactId) {

                Artifact root = artifactRepository.findById(artifactId)
                                .orElseThrow(() -> new RuntimeException("Artifact not found"));

                return buildTree(root, new HashSet<>());
        }

        public GraphResponse getImpactGraph(Long artifactId) {

                Artifact root = artifactRepository.findById(artifactId)
                                .orElseThrow(() -> new RuntimeException("Artifact not found"));

                List<GraphNode> nodes = new ArrayList<>();
                List<GraphEdge> edges = new ArrayList<>();

                Queue<TraversalNode> queue = new LinkedList<>();
                Set<Long> visited = new HashSet<>();
                Set<Long> edgeVisited = new HashSet<>();

                queue.add(new TraversalNode(root.getId(), 0));

                visited.add(root.getId());

                int rootDependencyCount = relationshipRepository
                                .findConnectedRelationships(root.getId())
                                .size();

                nodes.add(
                                mapImpactNode(
                                                root,
                                                0,
                                                true,
                                                rootDependencyCount));

                while (!queue.isEmpty()) {

                        TraversalNode current = queue.poll();

                        List<ArtifactRelationship> relationships = relationshipRepository.findConnectedRelationships(
                                        current.getId());

                        for (ArtifactRelationship relationship : relationships) {

                                Artifact neighbor;

                                if (relationship.getSourceArtifact().getId()
                                                .equals(current.getId())) {

                                        neighbor = relationship.getTargetArtifact();

                                } else {

                                        neighbor = relationship.getSourceArtifact();
                                }

                                if (!edgeVisited.contains(relationship.getId())) {

                                        edges.add(mapEdge(relationship));
                                        edgeVisited.add(relationship.getId());
                                }

                                if (visited.contains(neighbor.getId())) {
                                        continue;
                                }

                                visited.add(neighbor.getId());

                                int dependencyCount = relationshipRepository
                                                .findConnectedRelationships(neighbor.getId())
                                                .size();

                                nodes.add(
                                                mapImpactNode(
                                                                neighbor,
                                                                current.getLevel() + 1,
                                                                false,
                                                                dependencyCount));

                                queue.add(
                                                new TraversalNode(
                                                                neighbor.getId(),
                                                                current.getLevel() + 1));
                        }
                }

                return new GraphResponse(nodes, edges);
        }

        /**
         * Multi-level Impact Analysis (Breadth-First Search)
         */
        public GraphResponse getArtifactGraph(Long artifactId) {

                Artifact center = artifactRepository.findById(artifactId)
                                .orElseThrow(() -> new RuntimeException("Artifact not found"));

                List<GraphNode> nodes = new ArrayList<>();
                List<GraphEdge> edges = new ArrayList<>();

                Set<Long> visited = new HashSet<>();

                nodes.add(mapNode(center));
                visited.add(center.getId());

                List<ArtifactRelationship> relationships = relationshipRepository
                                .findBySourceArtifactIdOrTargetArtifactId(
                                                artifactId,
                                                artifactId);

                for (ArtifactRelationship relationship : relationships) {

                        Artifact source = relationship.getSourceArtifact();
                        Artifact target = relationship.getTargetArtifact();

                        if (!visited.contains(source.getId())) {
                                nodes.add(mapNode(source));
                                visited.add(source.getId());
                        }

                        if (!visited.contains(target.getId())) {
                                nodes.add(mapNode(target));
                                visited.add(target.getId());
                        }

                        edges.add(mapEdge(relationship));
                }

                return new GraphResponse(nodes, edges);
        }
}