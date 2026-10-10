package com.enterprise.dashen_repository.capability.entity;

import com.enterprise.dashen_repository.artifact.entity.Artifact;
import com.enterprise.dashen_repository.artifact.entity.ArtifactType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "capabilities")
public class Capability extends Artifact {

    @Column(name = "parent_id")
    private String parentId;

    @Column(name = "maturity_level")
    private Integer maturityLevel;

    @Column(name = "target_maturity")
    private Double targetMaturity = 5.0;

    public Capability() {
        setArtifactType(ArtifactType.CAPABILITY);
    }

    public Capability(String code,
            String name,
            String description,
            String parentId,
            Integer maturityLevel,
            Double targetMaturity) {

        setArtifactType(ArtifactType.CAPABILITY);

        setCode(code);
        setName(name);
        setDescription(description);

        this.parentId = parentId;
        this.maturityLevel = maturityLevel;
        this.targetMaturity = targetMaturity;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public Integer getMaturityLevel() {
        return maturityLevel;
    }

    public void setMaturityLevel(Integer maturityLevel) {
        this.maturityLevel = maturityLevel;
    }

    public Double getTargetMaturity() {
        return targetMaturity;
    }

    public void setTargetMaturity(Double targetMaturity) {
        this.targetMaturity = targetMaturity;
    }
}