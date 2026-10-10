package com.enterprise.dashen_repository.application.tco.entity;

import com.enterprise.dashen_repository.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "tco_category")
public class TCOCategory extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(nullable = false)
    private Boolean active = true;

    public TCOCategory() {
    }

    public TCOCategory(String code,
            String name,
            Integer displayOrder) {

        this.code = code;
        this.name = name;
        this.displayOrder = displayOrder;
        this.active = true;
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

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}