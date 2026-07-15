package com.enterprise.dashen_repository.artifact.dto;

import com.enterprise.dashen_repository.artifact.entity.ArtifactType;

public class CreateArtifactRequest {

    private String name;
    private String code;
    private String description;
    private ArtifactType artifactType;

    public CreateArtifactRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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