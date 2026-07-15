package com.enterprise.dashen_repository.capability.repository_capability;

import com.enterprise.dashen_repository.capability.entity.Capability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CapabilityRepository extends JpaRepository<Capability, String> {

    List<Capability> findByParentId(String parentId);

}