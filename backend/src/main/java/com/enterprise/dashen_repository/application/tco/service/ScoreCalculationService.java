package com.enterprise.dashen_repository.application.tco.service;

import com.enterprise.dashen_repository.application.tco.entity.TCOCategory;
import com.enterprise.dashen_repository.application.tco.entity.TCOScoreRule;
import com.enterprise.dashen_repository.application.tco.repository.TCOScoreRuleRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ScoreCalculationService {

    private final TCOScoreRuleRepository repository;

    public ScoreCalculationService(
            TCOScoreRuleRepository repository) {

        this.repository = repository;
    }

    public Integer calculateScore(
            TCOCategory category,
            BigDecimal total) {

        TCOScoreRule rule = repository
                .findFirstByCategoryAndMinimumValueLessThanEqualAndMaximumValueGreaterThanEqualAndActiveTrue(
                        category,
                        total,
                        total)
                .orElseThrow(() -> new RuntimeException(
                        "No score rule found."));

        return rule.getScore();
    }

}