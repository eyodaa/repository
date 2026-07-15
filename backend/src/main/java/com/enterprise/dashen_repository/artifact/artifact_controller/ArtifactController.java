package com.enterprise.dashen_repository.artifact.artifact_controller;

import com.enterprise.dashen_repository.artifact.artifact_service.ArtifactService;
import com.enterprise.dashen_repository.artifact.dto.ArtifactResponse;
import com.enterprise.dashen_repository.artifact.dto.CreateArtifactRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artifacts")
@CrossOrigin(origins = "*")
public class ArtifactController {

    private final ArtifactService service;

    public ArtifactController(ArtifactService service) {
        this.service = service;
    }

    @PostMapping
    public ArtifactResponse create(@RequestBody CreateArtifactRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<ArtifactResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ArtifactResponse getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}