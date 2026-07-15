package com.enterprise.dashen_repository.graph.graph_dto;

public class GraphNode {

    private Long id;
    private String label;
    private String type;

    public GraphNode() {
    }

    public GraphNode(Long id, String label, String type) {
        this.id = id;
        this.label = label;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}