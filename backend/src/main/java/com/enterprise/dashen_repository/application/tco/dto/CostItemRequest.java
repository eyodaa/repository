package com.enterprise.dashen_repository.application.tco.dto;

import java.util.ArrayList;
import java.util.List;

public class CostItemRequest {

    private Long costDefinitionId;

    private List<YearAmountRequest> yearlyAmounts = new ArrayList<>();

    public CostItemRequest() {
    }

    public Long getCostDefinitionId() {
        return costDefinitionId;
    }

    public void setCostDefinitionId(Long costDefinitionId) {
        this.costDefinitionId = costDefinitionId;
    }

    public List<YearAmountRequest> getYearlyAmounts() {
        return yearlyAmounts;
    }

    public void setYearlyAmounts(
            List<YearAmountRequest> yearlyAmounts) {

        this.yearlyAmounts = yearlyAmounts;
    }
}