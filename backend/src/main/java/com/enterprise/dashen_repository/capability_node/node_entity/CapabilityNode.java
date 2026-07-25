package com.enterprise.dashen_repository.capability_node.node_entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "capability_nodes")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CapabilityNode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // BASIC INFORMATION
    // ==========================

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    // ==========================
    // HIERARCHY
    // ==========================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private CapabilityNode parent;

    @Column(name = "level")
    private Integer level;

    @Column(name = "display_order")
    private Integer displayOrder;

    // ==========================
    // MATURITY
    // ==========================

    @Column(name = "current_maturity")
    private Double currentMaturity;

    @Column(name = "target_maturity")
    private Double targetMaturity;

    @Column(name = "maturity_gap")
    private Double maturityGap;

    @Column(name = "last_calculated")
    private LocalDateTime lastCalculated;

    public CapabilityNode() {
    }

    // ==========================
    // GETTERS & SETTERS
    // ==========================

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CapabilityNode getParent() {
        return parent;
    }

    public void setParent(CapabilityNode parent) {
        this.parent = parent;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public Double getCurrentMaturity() {
        return currentMaturity;
    }

    public void setCurrentMaturity(Double currentMaturity) {
        this.currentMaturity = currentMaturity;
    }

    public Double getTargetMaturity() {
        return targetMaturity;
    }

    public void setTargetMaturity(Double targetMaturity) {
        this.targetMaturity = targetMaturity;
    }

    public Double getMaturityGap() {
        return maturityGap;
    }

    public void setMaturityGap(Double maturityGap) {
        this.maturityGap = maturityGap;
    }

    public LocalDateTime getLastCalculated() {
        return lastCalculated;
    }

    public void setLastCalculated(LocalDateTime lastCalculated) {
        this.lastCalculated = lastCalculated;
    }
}