package com.enterprise.dashen_repository.application.tco.enums;

public enum AssessmentStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    NOT_APPLICABLE, // e.g., if application type doesn't support this cost type
    ERROR,
    DRAFT // For phase 1: ability to save draft even if incomplete
}
