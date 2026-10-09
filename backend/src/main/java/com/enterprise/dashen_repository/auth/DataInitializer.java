package com.enterprise.dashen_repository.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .role(Role.SYSTEM_ADMIN)
                    .build();
            userRepository.save(admin);
            
            User appAdmin = User.builder()
                    .username("appadmin")
                    .password(passwordEncoder.encode("appadmin"))
                    .role(Role.APPLICATION_ADMIN)
                    .build();
            userRepository.save(appAdmin);
            
            User techAdmin = User.builder()
                    .username("techadmin")
                    .password(passwordEncoder.encode("techadmin"))
                    .role(Role.TECHNOLOGY_ADMIN)
                    .build();
            userRepository.save(techAdmin);
            
            System.out.println("Default users initialized.");
        }
    }
}
