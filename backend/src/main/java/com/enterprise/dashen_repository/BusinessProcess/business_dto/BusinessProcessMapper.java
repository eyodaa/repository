package com.enterprise.dashen_repository.BusinessProcess.business_dto;

import com.enterprise.dashen_repository.BusinessProcess.business_process_entity.BusinessProcess;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BusinessProcessMapper {

    public BusinessProcessResponse toResponse(BusinessProcess process) {

        if (process == null) {
            return null;
        }

        BusinessProcessResponse response = new BusinessProcessResponse();

        // Artifact fields
        response.setId(process.getId());
        response.setCode(process.getCode());
        response.setName(process.getName());
        response.setDescription(process.getDescription());

        // Process fields
        response.setProcessCode(process.getProcessCode());
        response.setProcessOwner(process.getProcessOwner());
        response.setBusinessUnit(process.getBusinessUnit());

        response.setCategory(process.getCategory());
        response.setStatus(process.getStatus());
        response.setCriticality(process.getCriticality());
        response.setAutomationLevel(process.getAutomationLevel());
        response.setProcessLevel(process.getProcessLevel());

        response.setVersion(process.getVersion());
        response.setReviewDate(process.getReviewDate());
        response.setDocumentation(process.getDocumentation());

        // Parent
        if (process.getParentProcess() != null) {
            response.setParentProcessId(process.getParentProcess().getId());
            response.setParentProcessName(process.getParentProcess().getName());
        }

        // Children
        List<ChildProcessResponse> children = process.getChildProcesses()
                .stream()
                .map(child -> new ChildProcessResponse(
                        child.getId(),
                        child.getCode(),
                        child.getName()))
                .collect(Collectors.toList());

        response.setChildProcesses(children);

        return response;
    }

    public List<BusinessProcessResponse> toResponseList(List<BusinessProcess> processes) {
        return processes.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}