package com.enterprise.dashen_repository.capability_node.node_service;

import com.enterprise.dashen_repository.application.application_entity.ApplicationAnalysis;
import com.enterprise.dashen_repository.application.application_repository.ApplicationAnalysisRepository;
import com.enterprise.dashen_repository.artifact.entity.ArtifactType;
import com.enterprise.dashen_repository.capability_node.node_entity.CapabilityNode;
import com.enterprise.dashen_repository.capability_node.node_repository.CapabilityNodeRepository;
import com.enterprise.dashen_repository.relationship.relation_entity.ArtifactRelationship;
import com.enterprise.dashen_repository.relationship.relation_repository.ArtifactRelationshipRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CapabilityMaturityService {

    private final CapabilityNodeRepository capabilityNodeRepository;
    private final ArtifactRelationshipRepository relationshipRepository;
    private final ApplicationAnalysisRepository applicationAnalysisRepository;
    private final com.enterprise.dashen_repository.artifact.artifact_repository.ArtifactRepository artifactRepository;

    public CapabilityMaturityService(
            CapabilityNodeRepository capabilityNodeRepository,
            ArtifactRelationshipRepository relationshipRepository,
            ApplicationAnalysisRepository applicationAnalysisRepository,
            com.enterprise.dashen_repository.artifact.artifact_repository.ArtifactRepository artifactRepository) {
        this.capabilityNodeRepository = capabilityNodeRepository;
        this.relationshipRepository = relationshipRepository;
        this.applicationAnalysisRepository = applicationAnalysisRepository;
        this.artifactRepository = artifactRepository;
    }

    @Transactional
    public void calculateAllMaturity() {
        List<CapabilityNode> roots = capabilityNodeRepository.findByParentIsNullOrderByDisplayOrder();
        for (CapabilityNode root : roots) {
            calculateMaturityRecursive(root);
        }
    }

    private double calculateMaturityRecursive(CapabilityNode node) {
        List<CapabilityNode> children = capabilityNodeRepository.findByParentIdOrderByDisplayOrder(node.getId());

        double calculatedMaturity;

        if (children.isEmpty()) {
            // Leaf node: calculate average of connected applications
            calculatedMaturity = calculateLeafMaturity(node);
        } else {
            // Parent node: calculate average of children
            double sum = 0.0;
            int count = 0;
            for (CapabilityNode child : children) {
                double childMaturity = calculateMaturityRecursive(child);
                if (childMaturity > 0) {
                    sum += childMaturity;
                    count++;
                }
            }
            calculatedMaturity = count > 0 ? sum / count : 0.0;
        }

        // Only update if maturity was calculated (or if it's 0 because no apps/children found)
        node.setCurrentMaturity(calculatedMaturity);
        
        // Calculate gap if target is set
        if (node.getTargetMaturity() != null) {
            node.setMaturityGap(node.getTargetMaturity() - calculatedMaturity);
        }
        
        node.setLastCalculated(LocalDateTime.now());
        capabilityNodeRepository.save(node);

        return calculatedMaturity;
    }

    private double calculateLeafMaturity(CapabilityNode node) {
        // Find the artifact corresponding to this capability node by code
        Optional<com.enterprise.dashen_repository.artifact.entity.Artifact> artifactOpt = artifactRepository.findByCode(node.getCode());
        
        if (artifactOpt.isEmpty()) {
            return 0.0;
        }
        
        Long artifactId = artifactOpt.get().getId();

        List<ArtifactRelationship> relationships = relationshipRepository
                .findBySourceArtifactIdOrTargetArtifactId(artifactId, artifactId);

        double sum = 0.0;
        int count = 0;

        for (ArtifactRelationship rel : relationships) {
            boolean isSource = rel.getSourceArtifact().getId().equals(artifactId);
            var otherArtifact = isSource ? rel.getTargetArtifact() : rel.getSourceArtifact();

            if (otherArtifact.getArtifactType() == ArtifactType.APPLICATION) {
                Optional<ApplicationAnalysis> analysisOpt = applicationAnalysisRepository.findByApplicationId(otherArtifact.getId());
                if (analysisOpt.isPresent()) {
                    ApplicationAnalysis analysis = analysisOpt.get();
                    double appScore = (analysis.getOrganizationalValue() +
                                       analysis.getTechnicalHealth() +
                                       analysis.getEndUserPerspective() +
                                       analysis.getTotalCostOwnership()) / 4.0;
                    sum += appScore;
                    count++;
                }
            }
        }

        return count > 0 ? sum / count : 0.0;
    }
}
