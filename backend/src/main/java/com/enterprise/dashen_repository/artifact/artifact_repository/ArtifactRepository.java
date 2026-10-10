package com.enterprise.dashen_repository.artifact.artifact_repository;

import com.enterprise.dashen_repository.artifact.entity.Artifact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArtifactRepository extends JpaRepository<Artifact, Long> {
    Optional<Artifact> findByCode(String code);
}