package com.enterprise.dashen_repository.relationship.relation_controllor;

import com.enterprise.dashen_repository.relationship.relation_dto.CreateRelationshipRequest;
import com.enterprise.dashen_repository.relationship.relation_dto.RelationshipResponse;
import com.enterprise.dashen_repository.relationship.relation_service.ArtifactRelationshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relationships")
@CrossOrigin(origins = "*")
public class ArtifactRelationshipController {

    private final ArtifactRelationshipService service;

    public ArtifactRelationshipController(ArtifactRelationshipService service) {
        this.service = service;
    }

    @PostMapping
    public RelationshipResponse create(@RequestBody CreateRelationshipRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<RelationshipResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public RelationshipResponse getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}