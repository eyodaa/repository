package com.enterprise.dashen_repository.BusinessProcess.business_process_service;

import com.enterprise.dashen_repository.BusinessProcess.business_process_entity.BusinessProcess;
import com.enterprise.dashen_repository.BusinessProcess.business_process_repository.ProcessRepository;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProcessService {

    private final ProcessRepository repository;

    public ProcessService(ProcessRepository repository) {
        this.repository = repository;
    }

    public List<BusinessProcess> findAll() {
        return repository.findAll();
    }

    public BusinessProcess findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public BusinessProcess save(BusinessProcess businessProcess) {
        return repository.save(businessProcess);
    }

    public BusinessProcess update(Long id, BusinessProcess businessProcess) {
        BusinessProcess existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setCode(businessProcess.getCode());
        existing.setName(businessProcess.getName());
        existing.setDescription(businessProcess.getDescription());
        existing.setOwner(businessProcess.getOwner());
        existing.setProcessLevel(businessProcess.getProcessLevel());
        existing.setCriticality(businessProcess.getCriticality());
        existing.setStatus(businessProcess.getStatus());
        existing.setAutomationLevel(businessProcess.getAutomationLevel());
        existing.setDocumentation(businessProcess.getDocumentation());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
