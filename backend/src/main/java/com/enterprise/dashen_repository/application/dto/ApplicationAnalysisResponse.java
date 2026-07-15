package com.enterprise.dashen_repository.application.dto;

import com.enterprise.dashen_repository.application.enums.Disposition;
import com.enterprise.dashen_repository.application.enums.Priority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationAnalysisResponse {

    private Long applicationId;

    private String applicationName;

    private double organizationalValue;

    private double technicalHealth;

    private double endUserPerspective;

    private double totalCostOwnership;

    private boolean organizationalPass;

    private boolean technicalPass;

    private boolean endUserPass;

    private boolean tcoPass;

    private String pattern;

    private Disposition disposition;

    private Priority priority;

    // getters and setters
}
