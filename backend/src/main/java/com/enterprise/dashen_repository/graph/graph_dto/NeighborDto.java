package com.enterprise.dashen_repository.graph.graph_dto;

public class NeighborDto {

    private Long id;
    private String name;
    private String relationshipType;
    private String direction;

    public NeighborDto() {
    }

    public NeighborDto(Long id,
            String name,
            String relationshipType,
            String direction) {
        this.id = id;
        this.name = name;
        this.relationshipType = relationshipType;
        this.direction = direction;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRelationshipType() {
        return relationshipType;
    }

    public void setRelationshipType(String relationshipType) {
        this.relationshipType = relationshipType;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }
}