package com.enterprise.dashen_repository.application.tco.repository;

import com.enterprise.dashen_repository.application.tco.entity.TCOCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TCOCategoryRepository
                extends JpaRepository<TCOCategory, Long> {
}