package com.enterprise.dashen_repository.technology.technology_repository;

import com.enterprise.dashen_repository.technology.technology_entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnologyRepository extends JpaRepository<Technology, Long> {

}