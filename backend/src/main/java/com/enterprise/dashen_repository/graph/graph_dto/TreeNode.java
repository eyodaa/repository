package com.enterprise.dashen_repository.graph.graph_dto;

import java.util.ArrayList;
import java.util.List;

public class TreeNode {

    private Long id;
    private String label;
    private String type;

    private List<TreeNode> children = new ArrayList<>();

    public TreeNode() {
    }

    public TreeNode(Long id, String label, String type) {
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

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }
}
