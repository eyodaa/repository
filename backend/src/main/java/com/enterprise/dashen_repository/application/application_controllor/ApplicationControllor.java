package com.enterprise.dashen_repository.application.application_controllor;

import com.enterprise.dashen_repository.application.application_entity.Application;
import com.enterprise.dashen_repository.application.application_service.ApplicationService;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationControllor {

    private final ApplicationService service;

    public ApplicationControllor(ApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Application> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Application getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Application create(@RequestBody Application application) {
        return service.save(application);
    }

    @PutMapping("/{id}")
    public Application update(@PathVariable Long id,
            @RequestBody Application application) {
        return service.update(id, application);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/total-cost")
    public BigDecimal getTotalApplicationCost() {
        return service.getTotalApplicationCost();
    }
}