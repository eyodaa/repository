package com.enterprise.dashen_repository.capability_node.node_service;

import com.enterprise.dashen_repository.capability_node.node_entity.CapabilityNode;
import com.enterprise.dashen_repository.capability_node.node_repository.CapabilityNodeRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CapabilityNodeService {

    private final CapabilityNodeRepository repository;

    public CapabilityNodeService(CapabilityNodeRepository repository) {
        this.repository = repository;
    }

    public List<CapabilityNode> findAll() {
        return repository.findAll();
    }

    public List<CapabilityNode> findRoots() {
        return repository.findByParentIsNullOrderByDisplayOrder();
    }

    public List<CapabilityNode> findChildren(Long parentId) {
        return repository.findByParentIdOrderByDisplayOrder(parentId);
    }

    public CapabilityNode findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public CapabilityNode findByCode(String code) {
        return repository.findByCode(code).orElse(null);
    }

    public CapabilityNode save(CapabilityNode node) {
        return repository.save(node);
    }

    public CapabilityNode update(Long id, CapabilityNode node) {

        CapabilityNode existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setName(node.getName());
        existing.setDescription(node.getDescription());
        existing.setParent(node.getParent());
        existing.setLevel(node.getLevel());
        existing.setDisplayOrder(node.getDisplayOrder());

        existing.setTargetMaturity(node.getTargetMaturity());

        return repository.save(existing);

    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

}