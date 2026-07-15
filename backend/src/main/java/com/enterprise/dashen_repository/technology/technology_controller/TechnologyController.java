package com.enterprise.dashen_repository.technology.technology_controller;

import com.enterprise.dashen_repository.technology.technology_entity.Technology;
import com.enterprise.dashen_repository.technology.technology_service.TechnologyService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/technologies")
public class TechnologyController {

    private final TechnologyService technologyService;

    public TechnologyController(TechnologyService technologyService) {
        this.technologyService = technologyService;
    }

    // Create
    @PostMapping
    public ResponseEntity<Technology> createTechnology(@RequestBody Technology technology) {
        Technology saved = technologyService.save(technology);
        return ResponseEntity.ok(saved);
    }

    // Read All
    @GetMapping
    public ResponseEntity<List<Technology>> getAllTechnologies() {
        List<Technology> list = technologyService.findAll();
        return ResponseEntity.ok(list);
    }

    // Read One
    @GetMapping("/{id}")
    public ResponseEntity<Technology> getTechnology(@PathVariable Long id) {
        Technology tech = technologyService.findById(id);
        return tech != null ? ResponseEntity.ok(tech) : ResponseEntity.notFound().build();
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Technology> updateTechnology(@PathVariable Long id,
            @RequestBody Technology technology) {
        Technology updated = technologyService.update(id, technology);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTechnology(@PathVariable Long id) {
        technologyService.delete(id);
        return ResponseEntity.ok().build();
    }
}
