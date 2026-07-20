package com.enterprise.dashen_repository.application.application_entity;

import java.time.LocalDateTime;

import com.enterprise.dashen_repository.application.enums.Disposition;
import com.enterprise.dashen_repository.application.enums.Priority;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "application_analysis")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "application_id", unique = true)
    private Application application;

    private Double organizationalValue;
    private Double technicalHealth;
    private Double endUserPerspective;
    private Double totalCostOwnership;

    private Boolean organizationalPass;
    private Boolean technicalPass;
    private Boolean endUserPass;
    private Boolean tcoPass;

    private String pattern;

    @Enumerated(EnumType.STRING)
    private Disposition disposition;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private LocalDateTime lastCalculated;
}