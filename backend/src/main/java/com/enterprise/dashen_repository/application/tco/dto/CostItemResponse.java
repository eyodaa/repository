package com.enterprise.dashen_repository.application.tco.dto;

import java.util.ArrayList;
import java.util.List;

public class CostItemResponse {

    private Long costDefinitionId;

    private String code;

    private String name;

    private String category;

    private List<YearAmountResponse> yearlyAmounts = new ArrayList<>();

    public Long getCostDefinitionId() {
        return costDefinitionId;
    }

    public void setCostDefinitionId(Long costDefinitionId) {
        this.costDefinitionId = costDefinitionId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<YearAmountResponse> getYearlyAmounts() {
        return yearlyAmounts;
    }

    public void setYearlyAmounts(List<YearAmountResponse> yearlyAmounts) {
        this.yearlyAmounts = yearlyAmounts;
    }
}