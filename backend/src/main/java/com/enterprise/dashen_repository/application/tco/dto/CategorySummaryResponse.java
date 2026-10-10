package com.enterprise.dashen_repository.application.tco.dto;

import java.math.BigDecimal;

public class CategorySummaryResponse {

    private String category;

    private BigDecimal total;

    private Integer score;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}