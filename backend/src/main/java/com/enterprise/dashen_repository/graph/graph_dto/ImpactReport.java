package com.enterprise.dashen_repository.graph.graph_dto;

import java.util.List;

public class ImpactReport {

    private ImpactSummary summary;

    private List<GraphNode> nodes;

    private List<GraphEdge> edges;

    public ImpactReport() {
    }

    public ImpactReport(
            ImpactSummary summary,
            List<GraphNode> nodes,
            List<GraphEdge> edges) {

        this.summary = summary;
        this.nodes = nodes;
        this.edges = edges;
    }

    public ImpactSummary getSummary() {
        return summary;
    }

    public void setSummary(ImpactSummary summary) {
        this.summary = summary;
    }

    public List<GraphNode> getNodes() {
        return nodes;
    }

    public void setNodes(List<GraphNode> nodes) {
        this.nodes = nodes;
    }

    public List<GraphEdge> getEdges() {
        return edges;
    }

    public void setEdges(List<GraphEdge> edges) {
        this.edges = edges;
    }
}