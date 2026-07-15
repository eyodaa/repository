package com.enterprise.dashen_repository.graph.graph_dto;

import java.util.List;

public class NeighborResponse {

    private GraphNode artifact;
    private List<NeighborDto> neighbors;

    public NeighborResponse() {
    }

    public NeighborResponse(GraphNode artifact,
            List<NeighborDto> neighbors) {
        this.artifact = artifact;
        this.neighbors = neighbors;
    }

    public GraphNode getArtifact() {
        return artifact;
    }

    public void setArtifact(GraphNode artifact) {
        this.artifact = artifact;
    }

    public List<NeighborDto> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(List<NeighborDto> neighbors) {
        this.neighbors = neighbors;
    }
}