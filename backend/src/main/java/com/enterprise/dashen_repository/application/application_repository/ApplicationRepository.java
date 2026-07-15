package com.enterprise.dashen_repository.application.application_repository;

import com.enterprise.dashen_repository.application.application_entity.Application;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

}