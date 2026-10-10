package com.enterprise.dashen_repository.application.tco.service;

import com.enterprise.dashen_repository.application.tco.entity.TCOCategory;
import com.enterprise.dashen_repository.application.tco.entity.TCOCostItem;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CategoryCalculationService {

    public Map<String, BigDecimal> calculateCategoryTotals(List<TCOCostItem> items) {

        return items.stream()

                .collect(Collectors.groupingBy(
                        item -> item.getCostDefinition().getCategory().getCode(),

                        Collectors.reducing(
                                BigDecimal.ZERO,
                                TCOCostItem::getAmount,
                                BigDecimal::add)));
    }

}