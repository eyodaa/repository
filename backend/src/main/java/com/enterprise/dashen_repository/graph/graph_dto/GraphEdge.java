package com.enterprise.dashen_repository.graph.graph_dto;

public class GraphEdge {

    private Long id;
    private Long source;
    private Long target;
    private String type;

    public GraphEdge() {
    }

    public GraphEdge(Long id,
            Long source,
            Long target,
            String type) {

        this.id = id;
        this.source = source;
        this.target = target;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSource() {
        return source;
    }

    public void setSource(Long source) {
        this.source = source;
    }

    public Long getTarget() {
        return target;
    }

    public void setTarget(Long target) {
        this.target = target;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
