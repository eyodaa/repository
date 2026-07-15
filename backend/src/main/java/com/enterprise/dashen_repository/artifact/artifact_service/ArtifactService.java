package com.enterprise.dashen_repository.artifact.artifact_service;

import com.enterprise.dashen_repository.artifact.artifact_repository.ArtifactRepository;
import com.enterprise.dashen_repository.artifact.dto.ArtifactResponse;
import com.enterprise.dashen_repository.artifact.dto.CreateArtifactRequest;
import com.enterprise.dashen_repository.artifact.entity.Artifact;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArtifactService {

    private final ArtifactRepository repository;

    public ArtifactService(ArtifactRepository repository) {
        this.repository = repository;
    }

    public ArtifactResponse create(CreateArtifactRequest request) {

        Artifact artifact = new Artifact();

        artifact.setName(request.getName());
        artifact.setCode(request.getCode());
        artifact.setDescription(request.getDescription());
        artifact.setArtifactType(request.getArtifactType());

        Artifact saved = repository.save(artifact);

        return map(saved);
    }

    public List<ArtifactResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    public ArtifactResponse findById(Long id) {

        Artifact artifact = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artifact not found"));

        return map(artifact);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private ArtifactResponse map(Artifact artifact) {

        ArtifactResponse response = new ArtifactResponse();

        response.setId(artifact.getId());
        response.setName(artifact.getName());
        response.setCode(artifact.getCode());
        response.setDescription(artifact.getDescription());
        response.setArtifactType(artifact.getArtifactType());

        return response;
    }
}