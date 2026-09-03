package com.enterprise.dashen_repository.application.tco.dto;

import java.math.BigDecimal;

public class YearAmountResponse {

    private Integer financialYear;

    private BigDecimal amount;

    public Integer getFinancialYear() {
        return financialYear;
    }

    public void setFinancialYear(Integer financialYear) {
        this.financialYear = financialYear;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}