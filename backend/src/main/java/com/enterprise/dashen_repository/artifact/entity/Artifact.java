package com.enterprise.dashen_repository.artifact.entity;

import com.enterprise.dashen_repository.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "ea_artifact")
@Inheritance(strategy = InheritanceType.JOINED)
public class Artifact extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(length = 5000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArtifactType artifactType;

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

    public ArtifactType getArtifactType() {
        return artifactType;
    }

    public void setArtifactType(ArtifactType artifactType) {
        this.artifactType = artifactType;
    }
}