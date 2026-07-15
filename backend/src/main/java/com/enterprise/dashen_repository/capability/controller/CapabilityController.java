package com.enterprise.dashen_repository.capability.controller;

import com.enterprise.dashen_repository.capability.entity.Capability;
import com.enterprise.dashen_repository.capability.service.CapabilityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/capabilities")
@CrossOrigin(origins = "*")
public class CapabilityController {

    private final CapabilityService service;

    public CapabilityController(CapabilityService service) {
        this.service = service;
    }

    @GetMapping
    public List<Capability> getAll() {
        return service.findAll();
    }

    @GetMapping("/{code}")
    public Capability getById(@PathVariable String code) {
        return service.findById(code);
    }

    @PostMapping
    public Capability create(@RequestBody Capability capability) {
        return service.save(capability);
    }

    @PutMapping("/{code}")
    public Capability update(@PathVariable String code,
            @RequestBody Capability capability) {
        return service.update(code, capability);
    }

    @DeleteMapping("/{code}")
    public void delete(@PathVariable String code) {
        service.delete(code);
    }

    @GetMapping("/{code}/children")
    public List<Capability> getChildren(@PathVariable String code) {
        return service.findChildren(code);
    }
}