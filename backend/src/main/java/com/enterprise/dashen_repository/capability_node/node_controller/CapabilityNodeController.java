package com.enterprise.dashen_repository.capability_node.node_controller;

import com.enterprise.dashen_repository.capability_node.dto.CapabilityTreeDto;
import com.enterprise.dashen_repository.capability_node.node_entity.CapabilityNode;
import com.enterprise.dashen_repository.capability_node.node_service.CapabilityNodeService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nodes")
@CrossOrigin(origins = "*")
public class CapabilityNodeController {

    private final CapabilityNodeService service;
    private final com.enterprise.dashen_repository.capability_node.node_service.CapabilityMaturityService maturityService;

    public CapabilityNodeController(
            CapabilityNodeService service,
            com.enterprise.dashen_repository.capability_node.node_service.CapabilityMaturityService maturityService) {
        this.service = service;
        this.maturityService = maturityService;
    }

    @GetMapping
    public List<CapabilityNode> getAll() {
        return service.findAll();
    }

    @GetMapping("/roots")
    public List<CapabilityNode> getRoots() {
        return service.findRoots();
    }

    @GetMapping("/children/{parentId}")
    public List<CapabilityNode> getChildren(
            @PathVariable Long parentId) {
        return service.findChildren(parentId);
    }

    @GetMapping("/{id}")
    public CapabilityNode getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/code/{code}")
    public CapabilityNode getByCode(@PathVariable String code) {
        return service.findByCode(code);
    }

    @PostMapping
    public CapabilityNode create(@RequestBody CapabilityNode node) {
        return service.save(node);
    }

    @PutMapping("/{id}")
    public CapabilityNode update(
            @PathVariable Long id,
            @RequestBody CapabilityNode node) {
        return service.update(id, node);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/tree")
    public List<CapabilityTreeDto> getTree() {
        return service.getTree();
    }

    @PostMapping("/calculate-maturity")
    public void calculateMaturity() {
        maturityService.calculateAllMaturity();
    }
}
