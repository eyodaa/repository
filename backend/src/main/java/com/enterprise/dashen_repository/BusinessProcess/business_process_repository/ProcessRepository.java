package com.enterprise.dashen_repository.BusinessProcess.business_process_repository;

import com.enterprise.dashen_repository.BusinessProcess.business_process_entity.BusinessProcess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessRepository extends JpaRepository<BusinessProcess, Long> {
}
