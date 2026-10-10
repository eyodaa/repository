package com.enterprise.dashen_repository.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseUpdater implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        jdbcTemplate.update("UPDATE capability_nodes SET target_maturity = 5.0 WHERE target_maturity IS NULL OR target_maturity != 5.0");
        jdbcTemplate.update("UPDATE capabilities SET target_maturity = 5.0 WHERE target_maturity IS NULL OR target_maturity != 5.0");
        System.out.println("========== DATABASE UPDATED: target_maturity set to 5.0 ==========");
    }
}
