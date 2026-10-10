package com.enterprise.dashen_repository.BusinessProcess.business_process_service;

import com.enterprise.dashen_repository.BusinessProcess.business_process_entity.BusinessProcess;
import com.enterprise.dashen_repository.BusinessProcess.business_process_repository.ProcessRepository;
import com.enterprise.dashen_repository.BusinessProcess.business_dto.BusinessProcessMapper;
import com.enterprise.dashen_repository.BusinessProcess.business_dto.BusinessProcessResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessService {

    private final ProcessRepository repository;
    private final BusinessProcessMapper mapper;

    public ProcessService(ProcessRepository repository,
            BusinessProcessMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    // =====================================
    // CRUD
    // =====================================

    public List<BusinessProcessResponse> findAll() {
        return mapper.toResponseList(repository.findAll());
    }

    public BusinessProcessResponse findById(Long id) {

        BusinessProcess process = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Business Process not found with id: " + id));

        return mapper.toResponse(process);
    }

    public BusinessProcessResponse create(BusinessProcess process) {

        if (repository.existsByProcessCode(process.getProcessCode())) {
            throw new IllegalArgumentException(
                    "Process code already exists: " + process.getProcessCode());
        }

        // Set parent if supplied
        if (process.getParentProcess() != null
                && process.getParentProcess().getId() != null) {

            BusinessProcess parent = repository.findById(
                    process.getParentProcess().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Parent process not found."));

            process.setParentProcess(parent);
        }

        BusinessProcess saved = repository.save(process);

        return mapper.toResponse(saved);
    }

    public BusinessProcessResponse update(Long id,
            BusinessProcess updated) {

        BusinessProcess existing = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Business Process not found with id: " + id));

        // Artifact fields
        existing.setCode(updated.getCode());
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());

        // Business Process fields
        existing.setProcessCode(updated.getProcessCode());
        existing.setProcessOwner(updated.getProcessOwner());
        existing.setBusinessUnit(updated.getBusinessUnit());

        existing.setCategory(updated.getCategory());
        existing.setStatus(updated.getStatus());
        existing.setCriticality(updated.getCriticality());
        existing.setAutomationLevel(updated.getAutomationLevel());
        existing.setProcessLevel(updated.getProcessLevel());

        existing.setVersion(updated.getVersion());
        existing.setReviewDate(updated.getReviewDate());
        existing.setDocumentation(updated.getDocumentation());

        // Parent Process
        if (updated.getParentProcess() != null
                && updated.getParentProcess().getId() != null) {

            if (updated.getParentProcess().getId().equals(id)) {
                throw new IllegalArgumentException(
                        "A process cannot be its own parent.");
            }

            BusinessProcess parent = repository.findById(
                    updated.getParentProcess().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Parent process not found."));

            existing.setParentProcess(parent);

        } else {
            existing.setParentProcess(null);
        }

        BusinessProcess saved = repository.save(existing);

        return mapper.toResponse(saved);
    }

    public void delete(Long id) {

        BusinessProcess process = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Business Process not found with id: " + id));

        if (!process.getChildProcesses().isEmpty()) {
            throw new IllegalStateException(
                    "Cannot delete a process that has child processes.");
        }

        repository.delete(process);
    }
}