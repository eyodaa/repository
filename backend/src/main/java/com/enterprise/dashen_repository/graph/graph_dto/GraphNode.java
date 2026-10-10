package com.enterprise.dashen_repository.graph.graph_dto;

public class GraphNode {

    private Long id;
    private String label;
    private String type;
    private Integer level;
    private Boolean root;
    private String impactLevel;
    private Integer dependencyCount;

    public GraphNode() {
    }

    public GraphNode(Long id, String label, String type) {
        this.id = id;
        this.label = label;
        this.type = type;
    }

    public GraphNode(
            Long id,
            String label,
            String type,
            Integer level,
            Boolean root,
            String impactLevel,
            Integer dependencyCount) {

        this.id = id;
        this.label = label;
        this.type = type;
        this.level = level;
        this.root = root;
        this.impactLevel = impactLevel;
        this.dependencyCount = dependencyCount;
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

    public void setLevel(Integer level) {
        this.level = level;
    }

    public void setRoot(Boolean root) {
        this.root = root;
    }

    public void setImpactLevel(String impactLevel) {
        this.impactLevel = impactLevel;
    }

    public void setDependencyCount(Integer dependencyCount) {
        this.dependencyCount = dependencyCount;
    }

    public Integer getLevel() {
        return level;
    }

    public Boolean getRoot() {
        return root;
    }

    public String getImpactLevel() {
        return impactLevel;
    }

    public Integer getDependencyCount() {
        return dependencyCount;
    }
}