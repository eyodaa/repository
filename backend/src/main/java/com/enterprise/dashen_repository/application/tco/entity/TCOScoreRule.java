package com.enterprise.dashen_repository.application.tco.entity;

import com.enterprise.dashen_repository.common.entity.BaseEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tco_score_rule")
public class TCOScoreRule extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private TCOCategory category;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal minimumValue;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal maximumValue;

    @Column(nullable = false)
    private Integer score;

    @Column(length = 255)
    private String description;

    @Column(nullable = false)
    private Boolean active = true;

    public TCOScoreRule() {
    }

    public TCOCategory getCategory() {
        return category;
    }

    public void setCategory(TCOCategory category) {
        this.category = category;
    }

    public BigDecimal getMinimumValue() {
        return minimumValue;
    }

    public void setMinimumValue(BigDecimal minimumValue) {
        this.minimumValue = minimumValue;
    }

    public BigDecimal getMaximumValue() {
        return maximumValue;
    }

    public void setMaximumValue(BigDecimal maximumValue) {
        this.maximumValue = maximumValue;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}