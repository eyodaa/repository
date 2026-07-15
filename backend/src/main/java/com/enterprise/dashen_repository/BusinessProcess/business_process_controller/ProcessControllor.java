package com.enterprise.dashen_repository.BusinessProcess.business_process_controller;

import com.enterprise.dashen_repository.BusinessProcess.business_process_entity.BusinessProcess;
import com.enterprise.dashen_repository.BusinessProcess.business_process_service.ProcessService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business-processes")
public class ProcessControllor {

    private final ProcessService service;

    public ProcessControllor(ProcessService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<BusinessProcess>> getAllProcesses() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessProcess> getProcessById(@PathVariable Long id) {
        BusinessProcess process = service.findById(id);
        return process != null ? ResponseEntity.ok(process) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<BusinessProcess> createProcess(@RequestBody BusinessProcess businessProcess) {
        BusinessProcess created = service.save(businessProcess);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessProcess> updateProcess(@PathVariable Long id,
            @RequestBody BusinessProcess businessProcess) {
        BusinessProcess updated = service.update(id, businessProcess);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProcess(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
