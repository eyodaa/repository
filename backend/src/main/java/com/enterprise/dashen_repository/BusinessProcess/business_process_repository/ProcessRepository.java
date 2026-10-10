package com.enterprise.dashen_repository.BusinessProcess.business_process_repository;

import com.enterprise.dashen_repository.BusinessProcess.business_process_entity.BusinessProcess;
import com.enterprise.dashen_repository.BusinessProcess.enums.ProcessStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProcessRepository extends JpaRepository<BusinessProcess, Long> {

    // Find by process code
    Optional<BusinessProcess> findByProcessCode(String processCode);

    // Check uniqueness
    boolean existsByProcessCode(String processCode);

    // Search by process name
    List<BusinessProcess> findByNameContainingIgnoreCase(String name);

    // Find by owner
    List<BusinessProcess> findByProcessOwnerIgnoreCase(String processOwner);

    // Find by business unit
    List<BusinessProcess> findByBusinessUnitIgnoreCase(String businessUnit);

    // Find by status
    List<BusinessProcess> findByStatus(ProcessStatus status);

    // Find root processes
    List<BusinessProcess> findByParentProcessIsNull();

    // Find child processes
    List<BusinessProcess> findByParentProcessId(Long parentId);

}