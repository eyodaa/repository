package com.enterprise.dashen_repository.BusinessProcess.business_process_controller;

import com.enterprise.dashen_repository.BusinessProcess.business_process_entity.BusinessProcess;
import com.enterprise.dashen_repository.BusinessProcess.business_process_service.ProcessService;
import com.enterprise.dashen_repository.BusinessProcess.business_dto.BusinessProcessResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business-processes")
@CrossOrigin(origins = "*")
public class ProcessController {

    private final ProcessService service;

    public ProcessController(ProcessService service) {
        this.service = service;
    }

    // ==========================================
    // GET ALL PROCESSES
    // ==========================================
    @GetMapping
    public ResponseEntity<List<BusinessProcessResponse>> getAllProcesses() {
        return ResponseEntity.ok(service.findAll());
    }

    // ==========================================
    // GET PROCESS BY ID
    // ==========================================
    @GetMapping("/{id}")
    public ResponseEntity<BusinessProcessResponse> getProcessById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    // ==========================================
    // CREATE PROCESS
    // ==========================================
    @PostMapping
    public ResponseEntity<BusinessProcessResponse> createProcess(
            @RequestBody BusinessProcess businessProcess) {

        System.out.println("========== RECEIVED ==========");
        System.out.println("Code: " + businessProcess.getCode());
        System.out.println("Name: " + businessProcess.getName());
        System.out.println("Process Code: " + businessProcess.getProcessCode());
        System.out.println("Process Owner: " + businessProcess.getProcessOwner());
        System.out.println("==============================");

        BusinessProcessResponse created = service.create(businessProcess);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ==========================================
    // UPDATE PROCESS
    // ==========================================
    @PutMapping("/{id}")
    public ResponseEntity<BusinessProcessResponse> updateProcess(
            @PathVariable Long id,
            @RequestBody BusinessProcess businessProcess) {

        return ResponseEntity.ok(service.update(id, businessProcess));
    }

    // ==========================================
    // DELETE PROCESS
    // ==========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProcess(@PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}