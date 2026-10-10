package com.enterprise.dashen_repository.application.tco.repository;

import com.enterprise.dashen_repository.application.tco.entity.TCOCategory;
import com.enterprise.dashen_repository.application.tco.entity.TCOScoreRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.Optional;

public interface TCOScoreRuleRepository
                extends JpaRepository<TCOScoreRule, Long> {

        Optional<TCOScoreRule> findFirstByCategoryAndMinimumValueLessThanEqualAndMaximumValueGreaterThanEqualAndActiveTrue(
                        TCOCategory category,
                        BigDecimal value1,
                        BigDecimal value2);
}