package com.enterprise.dashen_repository.capability_node.node_repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enterprise.dashen_repository.capability_node.node_entity.CapabilityNode;

import java.util.List;
import java.util.Optional;

public interface CapabilityNodeRepository
        extends JpaRepository<CapabilityNode, Long> {

    List<CapabilityNode> findByParentIsNullOrderByDisplayOrder();

    List<CapabilityNode> findByParentIdOrderByDisplayOrder(Long parentId);

    Optional<CapabilityNode> findByCode(String code);

}