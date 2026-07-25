package com.enterprise.dashen_repository.capability_node.dto;

import java.util.ArrayList;
import java.util.List;

public class CapabilityTreeDto {

    private Long id;

    private String code;

    private String name;

    private Integer level;

    private Long parentId;

    private List<CapabilityTreeDto> children = new ArrayList<>();

    public CapabilityTreeDto() {
    }

    public CapabilityTreeDto(
            Long id,
            String code,
            String name,
            Integer level,
            Long parentId) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.level = level;
        this.parentId = parentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public List<CapabilityTreeDto> getChildren() {
        return children;
    }

    public void setChildren(List<CapabilityTreeDto> children) {
        this.children = children;
    }
}