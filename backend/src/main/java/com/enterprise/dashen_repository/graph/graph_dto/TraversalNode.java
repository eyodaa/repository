package com.enterprise.dashen_repository.graph.graph_dto;

public class TraversalNode {

    private Long id;
    private int level;

    public TraversalNode(Long id, int level) {
        this.id = id;
        this.level = level;
    }

    public Long getId() {
        return id;
    }

    public int getLevel() {
        return level;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLevel(int level) {
        this.level = level;
    }

}